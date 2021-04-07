const express = require("express");
const fs = require('fs');
const Datastore = require("nedb");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

const jsonFile = 'public/database.json';

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore({
  filename: "database.db",
  onload: err => {
    console.log(err);
  }
});
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
      response.status(400).send({
        status: 400,
        error: err
        })
    } else {
      response.json(data);
      //Save a json file
      database.find({}, (err, data) => {
        let JSONdata = JSON.stringify(data, null, 2);
          fs.writeFile(jsonFile, JSONdata, (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
      });
    }
    
  })
});

