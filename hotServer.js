// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; // port was changed from var PORT = 3000

// Data for tables


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res){
  res.sendfile("tables.json");
});

app.get("/create", function(req, res) {
  res.sendFile(path.join(__dirname, "create.html"));
});


// // Create New Characters - takes in JSON input
app.post("/create", function(req, res) {
  var tables = JSON.parse(fs.readFileSync("tables.json", "utf8"));
  var newTable = req.body;
  newTable.name = req.body.name.replace(/\s+/g, "").toLowerCase();
  newTable.phone = req.body.phone;
  newTable.id = req.body.id;
  newTable.email = req.body.email;
  newTable.waitList = tables.length + 1;
  if (tables.length<6) {
    newTable.hasTable = true;
  } else {
    newtable.hasTable = false;
  }
  tables.push(newTable);
  fs.writeFileSync("tables.json", JSON.stringify(tables), "utf8");
  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});