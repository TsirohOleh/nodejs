const users = require('../db/users.json');

const express = require('express');
const app = express();
const port = 3000;

app.get('/users', (req, res) => {
  res.send(users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));