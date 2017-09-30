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
  password: "12345",
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

// Add recipe to DB
app.post("/add", (req, res) => {
  client
    .query(
      "insert into rlist(name, ingredients, description) values($1, $2, $3)",
      [req.body.name, req.body.ingredients, req.body.description]
    )
    .then(res.redirect("/"))
    .catch(err => console.error(err));
});

// Remove from DB
app.delete("/delete/:id", (req, res) => {
  client
    .query("delete from rlist where id = $1", [req.params.id])
    .then(res => res.send(200))
    .catch(err => console.error(err));
});

app.post("/edit", (req, res) => {
  client
    .query(
      "update rlist set name=$1, ingredients=$2, description=$3 where id=$4",
      [req.body.name, req.body.ingredients, req.body.description, req.body.id]
    )
    .then(res.redirect("/"))
    .catch(err => console.error(err));
});

// Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
