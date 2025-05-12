// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API route
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;

  // If no param, return current time
  if (!dateParam) {
    date = new Date();
  } else {
    // If the param is a number (UNIX timestamp), parse it as an integer
    if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Else try to parse as a regular date string
      date = new Date(dateParam);
    }
  }

  // Check if the date is invalid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return result
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
