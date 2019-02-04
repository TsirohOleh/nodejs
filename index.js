const { join } = require('path');
const express = require('express');
const logger = require('winston');

const handlers = ['products']; // todo

const port = process.env.APP_PORT;


const app = express();

handlers.map(item => {
  const resource = require(join(__dirname, 'src', 'handlers', item));

  app.use(`/${item}`, resource);
});

// todo: Error handler

app.listen(port, () => {
  logger.info('Server has been up and running...', { port });
});
