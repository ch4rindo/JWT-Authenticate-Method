const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// ユーザー登録
exports.register = async (req, res) => {
	console.log(req.body);

	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ status: 400, error: "Invalid headers" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await User.create({ name, email, password: hashedPassword });
		res.status(201).json({ status: 201, message: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({ status: 500, error: 'Internal server error' });
	}
};

// ログイン
exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ where: { email } });
		if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ status: 401, error: 'Invalid credentials' });

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '180d' });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ status: 500, error: error.message });
	}
};
