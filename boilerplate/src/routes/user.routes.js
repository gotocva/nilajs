
import express from "express";

const userRouter = express.Router();

import * as userController from "@controller/user.controller";
import { checkObjectId } from "@middleware/objectId.middleware";

/**
 * user api routes
 *
 */
userRouter.get('/list', [ ],  userController.list);
userRouter.post('/', [], userController.create);
userRouter.get('/:id', [checkObjectId],  userController.getOne);
userRouter.put('/:id', [checkObjectId], userController.update);
userRouter.delete('/:id', [checkObjectId], userController.deleteOne);

module.exports = userRouter;
