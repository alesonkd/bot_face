const express = require('express');
const { User } = require('./app/models');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/users', (req, res) => {}); //Listar todos
app.post('/users', (req, res) => {}); // Criar
app.get('/users/:id', (req, res) => {}); //Buscar
app.put('/users/:id', (req, res) => {}); //Editar
app.delete('/users/:id', (req, res) => {}); //Deletar

app.get('/', (req, res) => {
  res.send('Hello World!');
  User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });
});

app.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.listen(3000);