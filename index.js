const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cons = require("consolidate"),
  dust = require("dustjs-helpers"),
  { Pool, Client } = require("pg");

const app = express();

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

// DB connect
const client = new Client({
  user: "ignat",
  host: "localhost",
  database: "recipes",
  password: "121233",
  port: 5432
});

client.connect();

// Get and render recipes from DB
app.get("/", (req, res) => {
  client
    .query("select * from rlist")
    .then(result => res.render("index", { recipes: result.rows }))
    .catch(err => console.error(err));
});

// Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
