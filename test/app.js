var express = require('express');
var path = require('path');
var app = express();

const bodyParser = require('body-parser');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'view')));
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to telephone" });
});
app.listen(8000, '0.0.0.0', function() {
    console.log("Server is listening on port 8000");
});

module.exports = app;