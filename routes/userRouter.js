const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");

router.post("/register", userCtrl.register);

module.exports = router;
