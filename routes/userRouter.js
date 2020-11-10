const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", userCtrl.register);

router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset_password", auth, userCtrl.resetPassword);

router.get("/info", auth, userCtrl.getUserInfo);

router.get("/all_info", auth, authAdmin, userCtrl.getUserInfo);

module.exports = router;
