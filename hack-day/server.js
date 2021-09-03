const express = require('express');
const bodyParser = require('body-parser');
const database = require('./server/database.json');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/exercises', (req, res) => {
  res.send(database);
});

/*

- Get workouts
- Post workout
- Put workout
- Delete workouts

*/

app.post('/api/exercise', (req, res) => {
  console.log('Got a req!')
  console.log(req.body);
  console.log(database);
  database.push(req.body);

  fs.writeFile('server/database.json', JSON.stringify(database), a => console.log(a));
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));