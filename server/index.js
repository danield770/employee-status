const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());

const employees = [
  {
    id: 1,
    name: 'John',
    status: 'Working',
  },
  {
    id: 2,
    name: 'Jack',
    status: 'Working',
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
  },
];

app.get('/users', (req, res) => {
  res.send(employees);
});

app.post('/users/:id', (req, res) => {
  const index = employees.findIndex((obj) => obj.id === +req.params.id);
  employees[index].status = req.body.status;
  res.send(employees);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
