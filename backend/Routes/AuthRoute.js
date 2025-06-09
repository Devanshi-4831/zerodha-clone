const { Signup, Login, userVerification } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification); // optional route

module.exports = router;

