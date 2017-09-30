const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cons = require("consolidate"),
  dust = require("dustjs-helpers"),
  pg = require("pg");

const app = express();

// DB Connect
const dbConnect = "postgres://ignat:121233@localhost:5432/recipes";

// Assign Dust Engine To .dust Files
app.engine("dust", cons.dust);

// .dust Default Ext.
app.set("view engine", "dust");
app.set("views", `${__dirname}/views`);

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello there!");
});

// Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
