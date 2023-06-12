var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use(userRoutes);
app.use(authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
