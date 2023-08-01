import express from "express";

import * as UserController from "@controller/user.controller";

import { authCheck } from "@middleware/auth.middleware";

const userRouter = express.Router();

userRouter.get('/', (req, res) => { res.send('Api v1 working'); });

/**
 * User api routes
 *
 */
userRouter.get('/users', [ authCheck ],  UserController.getAllUsers);
userRouter.post('/user/auth/register', [], UserController.storeUser);
userRouter.post('/user/auth/login', UserController.loginUser);

module.exports = userRouter;