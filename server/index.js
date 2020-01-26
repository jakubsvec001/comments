const express = require('express');
const path = require('path');

const PORT = 3000;
const PUBLIC = path.resolve(__dirname, '..', 'client', 'dist');
const app = express();

app.use(express.static(PUBLIC));

app.get('/api/songs/:songId', (req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`boboBeats server listening on port ${PORT}.`));
