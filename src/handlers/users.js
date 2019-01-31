let users = require('../db/users.json');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(user => user.id.toString() === req.params.id);

  res.send(user);
});

app.post('/users', (req, res) => {
  const newUser = {...req.body};

  newUser.id = users.slice(-1)[0].id + 1;
  users.push(newUser);
  res.send(users);
});

app.put('/users', (req, res) => {
  const changedUser = {...req.body};
  const userId = changedUser.id;

  users = users.map(user => {
    return user.id.toString() === changedUser.id ? changedUser : user;
  });

  res.send(users);
});

app.delete('/users', (req, res) => {
  const userId = req.body.id;
  const modiffiedUsers = users.filter(user => user.id.toString() !== userId);

  res.send(modiffiedUsers);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));