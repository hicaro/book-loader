var mongoose = require('mongoose');

if (process.env.NODE_ENV === "production") {
  mongoose.connect("mongo://");
} else {
  mongoose.connect("mongo://localhost:27017");
}
