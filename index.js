const { join } = require('path');
const express = require('express');
const logger = require('winston');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const handlers = fs.readdirSync(join(__dirname, 'src', 'handlers'))
  .map(handler => handler.split('.')[0]);
const port = process.env.APP_PORT;

console.log(handlers);

app.use(bodyParser.urlencoded());

handlers.map(item => {
  const resource = require(join(__dirname, 'src', 'handlers', item));

  app.use(`/${item}`, resource);
});

app.use((err, req, res, next) => {
  res
    .status(err.status)
    .send(err.message);
});

app.listen(port, () => {
  logger.info('Server has been up and running...', { port });
});
