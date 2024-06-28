const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());

const users = [
  { email: 'user@example.com', password: 'password123' }
];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign({ email: user.email }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});