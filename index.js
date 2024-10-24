const express = require('express');
const authController = require('./controllers/authController');
const authenticateJWT = require('./middlewares/authJWT');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Hello world!' });
});

app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/protected', authenticateJWT, (req, res) => {
	res.json({ message: 'This is a protected route' });
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});