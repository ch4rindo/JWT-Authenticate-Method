const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Authorizationヘッダーが存在するか確認
  if (!authHeader) {
    return res.status(403).json({ error: 'Access denied, no token provided' });
  }

  // トークンを取り出し、"Bearer "を削除
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
