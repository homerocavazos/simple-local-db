const express = require("express");
const fs = require("fs");
const Datastore = require("nedb");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  data._id = data.email_address;

  database.insert( data , (err, doc) => {
    if (err) {
      response.end();
      return err;
    }
    response.json(data);
  })
});

