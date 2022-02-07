let env = {
  dbUrl:
    "mongodb+srv://ahsanpm:ahsan75furqan@routify.d9dur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ||
    "mongodb://localhost:27017/routify" ||
    process.env.dbUrl,
  SERVER_SECRET: "1234" || process.env.SERVER_SECRET,
  POSTSECRET:
    "a491ad84-cabb-4a74-a0d9-489330170c6b" ||
    "4844c7cd-bcfa-4581-bc97-cd09550c0f68" ||
    process.env.POSTSECRET,
};

module.exports = env;
