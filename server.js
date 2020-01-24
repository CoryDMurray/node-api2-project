const express = require('express');

const postsRouter = require('./posts/postsRouter');

const server = express();
server.listen(4000, () => {
  console.log('=== server listening on port 4000 ===');
});
server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Posts API</h>
      <p>Welcome to the Lambda Posts API</p>
    `);
});

