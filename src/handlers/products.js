const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({
    a: 1,
    b:2
  })
});

router.get('/:id', (req, res) => {
  res.send({ c: 3 })
});

// todo: get all, create, update, delete, get by id /users
// todo: Idempotence in HTTP / REST
// todo: Appropriate status codes (post: 201, 400, 401, 404)
// todo: Error handler

module.exports = router;
