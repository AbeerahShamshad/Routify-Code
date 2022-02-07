const express = require("express");
const morgan = require("morgan");
const http = require("http");
const cors = require("cors");
const app = express();
const env = require("./config/env");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var authController = require("./routes/auth-controller");
const { userModel } = require("./model/index");

var socketIo = require("socket.io");
const PORT = 5000 || process.env.PORT;

const server = http.createServer(app);
var io = socketIo(server);

io.on("connection", () => {
  console.log("socket connected");
});

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authController);

app.use(function (req, res, next) {
  if (!req.cookies.jToken) {
    res.status(401).send("include http-only credentials with every request");
    return;
  }
  jwt.verify(
    req.cookies.jToken,
    env.SERVER_SECRET,
    function (err, decodedData) {
      if (!err) {
        const issueDate = decodedData.iat * 1000; // 1000 miliseconds because in js ms is in 16 digits
        const nowDate = new Date().getTime();
        const diff = nowDate - issueDate; // 86400,000

        if (diff > 30000000) {
          // expire after 5 min (in milis)
          res.clearCookie("jToken");
          res.status(401).send("token expired");
        } else {
          var token = jwt.sign(
            {
              id: decodedData.id,
              username: decodedData.name,
              email: decodedData.email,
              role: decodedData.role,
              // phoneNumber: decodedData.phoneNumber,
            },
            env.SERVER_SECRET
          );
          res.cookie("jToken", token, {
            maxAge: 86_400_000,
            httpOnly: true,
          });
          req.body.jToken = decodedData;
          req.headers.jToken = decodedData;
          next();
        }
      } else {
        res.status(401).send("invalid token");
      }
    }
  );
});

app.get("/profile", (req, res, next) => {
  userModel.findById(
    req.body.jToken.id,
    "name email role",
    function (err, doc) {
      if (!err) {
        res.send({
          profile: doc,
        });
      } else {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  );
});

app.post("/logout", (req, res) => {
  res.cookie("jToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.clearCookie("jToken");
  res.send({
    message: "logout succesfully",
  });
});

server.listen(PORT, () => {
  console.log("server is listetning on PORT : " + PORT);
});
