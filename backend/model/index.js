const mongoose = require('mongoose');
const env = require('../config/env');



mongoose.connect(env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });



mongoose.connection.on("disconnected", () => {
    console.log("MONGODB disconnected");
    process.exit(1);
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB disconnected due to : " + err);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("MONGODB disconnected");
        process.exit(0);
    })
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdOn: { "type": Date, "default": Date.now },
});




const userModel = mongoose.model("user", userSchema);
const otpModel = mongoose.model("otp", otpSchema);



module.exports = {
    userModel,
    otpModel,

}







