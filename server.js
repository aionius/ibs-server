const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// api routes definition
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// bodyparser middleware
app.use(bodyParser.urlencoded({ extends: false }));
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

// passport middleware
app.use(passport.initialize());

// load passport config
require("./config/passport.js")(passport);

app.get("/", (req, res) => res.send("welcome to it bookstore"));

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// set the port
const port = process.env.PORT || 5001;

// start the server and listen to port
app.listen(port, () => console.log(`SERVER started at port ${port}.`));
