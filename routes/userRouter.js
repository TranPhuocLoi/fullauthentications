const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);
router.post("/login", userCtrl.login);

module.exports = router;
