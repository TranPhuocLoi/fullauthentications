const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // TODO validate input
      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fileds." });

      if (!validateEmail(email))
        res.status(400).json({ msg: "Invalid emails." });

      const userCreated = await Users.findOne({ email });
      if (userCreated)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/active/${activation_token}`;

      sendMail(email, url);

      res.json({ msg: "Register success! Please active your email to start" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;

      const userCreated = await Users.findOne({ email });
      if (userCreated)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new Users({
        name,
        email,
        password,
      });

      await newUser.save();

      res.json({ msg: "Account had been created!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
