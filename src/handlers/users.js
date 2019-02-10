const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  editUser,
  deleteUser
} = require('../helpers/users-helper');

router.get('/', (req, res, next) => {
  try {
    res
    .status(200)
    .send(getUsers());
  }
  catch(err) {
    next(err);
  }
});

router.post('/', (req, res) => {
  const data = req.body;

  createUser(data)
    .then(data => {
      res
        .status(201)
        .send('DONE');
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  
  try {
    res
      .status(200)
      .send(getUser(id));
  }
  catch(err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  editUser(id, data)
    .then(data => {
      res
        .status(200)
        .send('DONE');
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  deleteUser(id)
    .then(data => {
      console.log(data);
      res
        .status(200)
        .send('DONE');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
