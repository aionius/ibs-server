const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// api routes definition
const users = require("./routes/api/users");
const books = require("./routes/api/books");
const cart = require("./routes/api/cart");

const app = express();

// bodyparser middleware
// app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

// db config
const keys = require("./config/keys");

// connect to the database
mongoose
   .connect(keys.mongoURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
   })
   .then(() => console.log("MongoDB Connected"))
   .catch(err => console.log(err));

// use routes
app.use("/api/users", users);
app.use("/api/books", books);
app.use("/api/cart", cart);

// set the port
const port = process.env.PORT || 3000;

// start the server and listen to port
app.listen(port, () => console.log(`SERVER started at port ${port}.`));
