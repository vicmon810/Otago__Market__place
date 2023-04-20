const { MongoClient } = require("mongodb");
const dbUser = process.env.ATLAS_USER;
const dbPassword = process.env.ATLAS_PASSWORD;
const Db = "mongodb+srv://" + dbUser + ":" + dbPassword + "@cluster0.hayoush.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("test");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
