// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const SECRET = 'dev-secret';

// app.post('/api/auth/login', (req, res) => {
//   const { email, password } = req.body;
//   // dummy users
//   const role = email.includes('user')
//     ? ['admin']
//     : email.includes('manager')
//     ? ['manager']
//     : ['user'];

//   if (!password) return res.status(401).json({ message: 'Invalid' });

//   const token = jwt.sign({ sub: email, roles: role }, SECRET, { expiresIn: '2h' });
//   res.json({ token });
// });

// app.listen(3000, () => console.log('Auth API on http://localhost:3000'));



const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'dev-secret';

// Dummy user database
const users = [
  { email: 'user@example.com', password: 'User@1234' },
  { email: 'manager@example.com', password: 'Manager@1234' },
  { email: 'guest@example.com', password: 'Guest@1234' },
];

// Helper function to validate password strength
function isStrongPassword(password) {
  // Minimum 8 chars, at least one uppercase, one lowercase, one number, one special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email exists
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'Email not registered' });

  // Check password
  if (user.password !== password)
    return res.status(401).json({ message: 'Incorrect password' });

  // Check password strength
  if (!isStrongPassword(password))
    return res.status(400).json({ message: 'Password is not strong enough' });

  // Assign roles based on email
  const role = email.includes('user')
    ? ['admin']
    : email.includes('manager')
    ? ['manager']
    : ['user'];

  // Create JWT
  const token = jwt.sign({ sub: email, roles: role }, SECRET, { expiresIn: '2h' });

  res.json({ token });
});

app.listen(3000, () => console.log('Auth API on http://localhost:3000'));
