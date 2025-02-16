const express = require("express");
const { login, signup, logout } = require("../controllers/auth.controllers");
const authRouter = express.Router();

authRouter.post("/login",login);
authRouter.post("/signup",signup);
authRouter.post("/logout",logout);

module.exports= authRouter;