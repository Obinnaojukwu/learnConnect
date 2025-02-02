const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

// Register a new user
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  createUser({ name, email, password: hashedPassword }, (err, user) => {
    if (err) return res.status(500).send({ message: 'Error registering user.' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ token });
  });
};

// User login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ token });
  });
};