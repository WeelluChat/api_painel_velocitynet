const { Router } = require("express");
const loginController = require("../controllers/loginController");

const router = Router();

router.post("/login", loginController.login);
router.post("/auth/login", loginController.authLogin);
router.post("/auth/register", loginController.authRegister);
router.get("/auth/users", loginController.authUser);
router.put("/auth/password/:id", loginController.authPassword);

module.exports = router;
