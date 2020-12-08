const express = require('express');
const bodyParser = require('body-parser');  // enables accessing the payload of http post requests
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes')); // routes module

/*
app.get('/', (req, res) => {
  res.send('Hello World from express');
});
*/

app.listen(port, () => console.log(`Hello world on port ${port}`));

