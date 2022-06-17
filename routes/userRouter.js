import {Router} from "express";
import {getRanking,getUserById} from "../controllers/userController.js";
import {validateToken} from "../middlewares/tokenvalidator.js";

const userRouter = Router();
userRouter.get('/users/:id',validateToken, getUserById);
user.get('/ranking', getRanking);

export default userRouter;