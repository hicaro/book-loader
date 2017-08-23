var mongoose  = require('mongoose');

var Schema    = new mongoose.Schema({
  title: String,
  author: String,
  text: String,
  promo: String,
  url: String,
  image: String,
  type: String,
  genre: String
});

var Book = mongoose.model('Book', Schema);

module.exports.cleanImport = function (cb) {
  Book.remove({}, function (err) {
    if (err) {
      console.log(err);
      mongoose.connection.close();
    }
    else {
      cb();
    }
  });
};

module.exports.insert = function (book) {
  Book.create(book, function (err, b){
    if (err) {
      console.log(err);
    }
  });
};
