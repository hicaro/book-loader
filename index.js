var readline  = require('readline');
var fs        = require('fs');
var db        = require('./db');
var Books     = require('./books');

// connect to database
db.connect();

var load = function () {
  var reader = readline.createInterface({
    input: fs.createReadStream('books.csv')
  });

  var lineCouter = 0;
  var header = [];

  reader.on('line', function(line) {
    var items = line.split('|');

    if (lineCouter == 0) {
      header = items;
      lineCouter++;
    } else {
      var book = {};

      if (header.length === items.length) {
        header.forEach(function (key, i) {
          book[key] = items[i];
        });

        Books.insert(book);
        lineCouter++;
      }
    }

  });

  reader.on('close', function(){
    console.log((lineCouter - 1) + ' books were imported.');
    // close database connection
    db.disconnect();
  });
};

// remove old values and insert new ones
Books.cleanImport(load);
