const User = require("../models/user"); 
const { setUser } = require("../service/auth");
const bcrypt = require("bcryptjs");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password, // Will hash in pre-save
      role: "free" // Explicit default
    });
    const token = setUser(user);
    res.cookie("token", token, { httpOnly: true }); // Secure cookie
    return res.status(201).json({ message: "Signup success", redirect: "/" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }
    const token = setUser(user);
    res.cookie("token", token, { httpOnly: true });
    return res.json({ message: "Login success", redirect: "/" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin
};