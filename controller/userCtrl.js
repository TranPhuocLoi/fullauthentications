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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email dose not exits." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ mgs: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) return res.status(400).json({ msg: "Please Login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.status(400).json({ msg: "Please loggin now !" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.massage });
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
