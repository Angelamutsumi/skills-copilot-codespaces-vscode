// Create web server application that can respond to requests for comments
// from the comments table in the database.  The comments table has the following
// schema:
//   comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
//   comment TEXT,
//   date TEXT
// The server should respond to GET requests to the /comments path.  The query
// string will contain a date parameter, and the response should be a JSON array
// containing all of the comments from the given date.  For example, a request to
// the following path:
//   /comments?date=2016-12-01
// should return an array of all of the comments from December 1, 2016.

'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.sqlite');
var express = require('express');
var app = express();

app.get('/comments', function(req, res) {
  var date = req.query.date;
  db.all("SELECT * FROM comments WHERE date = ?", date, function(err, rows) {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(3000);
