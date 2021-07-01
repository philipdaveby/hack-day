const express = require('express');
const bodyParser = require('body-parser');
const database = require('./server/database.json');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const database = fs.readFile('./server/database.js');

app.get('/api/exercises', (req, res) => {
  res.send(database);
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));