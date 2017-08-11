var mongoose    = require('mongoose');

var BooksSchema = new mongoose.Schema({
  title: String,
  author: String,
  text: String,
  promo: String,
  url: String,
  image: String
});

var Book = mongoose.model('Book', BookSchema);

module.exports.insert = function (book) {

};
