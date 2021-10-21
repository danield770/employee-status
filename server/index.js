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
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Jack',
    status: 'OnVacation',
    img: 'https://randomuser.me/api/portraits/men/90.jpg',
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    img: 'https://randomuser.me/api/portraits/women/81.jpg',
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'BusinessTrip',
    img: 'https://randomuser.me/api/portraits/men/40.jpg',
  },
];

app.get('/users', (req, res) => {
  res.send(employees);
});

app.post('/users/:id', (req, res) => {
  // console.log('req/update status: ', req);
  console.log('req/update status: - req body', req.body);
  const index = employees.findIndex((obj) => obj.id === +req.params.id);
  employees[index].status = req.body.status;
  res.send(employees);
});

app.post('/create', (req, res) => {
  console.log('req/create user: ', req.body);
  const newUser = {
    id: employees.length + 1,
    name: req.body.name,
    status: req.body.status,
    img: `https://randomuser.me/api/portraits/men/${Math.round(
      Math.random() * 100
    )}.jpg`,
  };
  console.log('new user: ', newUser);
  employees.push(newUser);
  console.log('updated employees: ', employees);
  res.send(employees);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
