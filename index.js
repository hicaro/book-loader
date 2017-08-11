var readline = require('readline');
var fs = require('fs');

var reader = readline.createInterface({
  input: fs.createReadStream('books.txt')
});

reader.on('line', function(line) {
  var items = line.split('|');
  console.log(items);
});
