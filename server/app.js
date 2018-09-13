const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'client_dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client_dist', 'index.html'));
});

app.listen(3000, 'localhost', () => {
  console.log('server running on http://localhost:3000');
});