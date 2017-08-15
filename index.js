var csv       = require('fast-csv');
var fs        = require('fs');
var db        = require('./db');
var Books     = require('./books');

// connect to database
db.connect();

var load = function () {
  var stream = fs.createReadStream('books.csv');

  var lineCouter = 0;
  var header = [];

  var csvStream = csv
    .parse({delimiter: '|'})
    .on("data", function(items){
      if (lineCouter == 0) {
        header = items;
        lineCouter++;
      } else {
        var book = {};

        if (header.length === items.length) {
          header.forEach(function (key, i) {
            book[key] = items[i]
              .replace(/[\u2018\u2019]/g, "'")
              .replace(/[\u201C\u201D]/g, '"')
              .replace(/[\u2013\u2014]/g, '-')
              .replace(/[\u2026]/g, '...');
          });

          Books.insert(book);
          lineCouter++;
        }
      }
    })
    .on("end", function(){
      console.log((lineCouter - 1) + ' books were imported.');
      // close database connection
      db.disconnect();
    });

  stream.pipe(csvStream);
};

// remove old values and insert new ones
Books.cleanImport(load);
