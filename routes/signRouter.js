import { Router } from "express";
import { doSignin,doSignup } from "../controllers/signController"
import { validateSchema } from "../middlewares/schemaValidator.js"
import userSchema from "../schemas/userSchema.js";

const signRouter = Router();

logRouter("/signIn",validateSchema(userSchema), doSignin)
logRouter("/signUp", doSignup)

export default signRouter;