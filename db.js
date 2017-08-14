var mongoose = require('mongoose');

module.exports.connect = function () {
  var url = '';
  if (process.env.NODE_ENV === "production") {
    url = "mongodb://";
  } else {
    url = "mongodb://localhost:27017/typingfrombooks";
  }

  mongoose.connect(url, {
    useMongoClient: true
  });
};

module.exports.disconnect = function () {
    mongoose.connection.close();
};
