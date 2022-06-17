import { Router } from "express";
import { doSignin,doSignup } from "../controllers/signController"
import { validateSchema } from "../middlewares/schemaValidator.js"
import userSchema from "../schemas/userSchema.js";
import signinSchema from "../schemas/loginSchema.js";

const signRouter = Router();

logRouter("/signup", validateSchema(userSchema), doSignup)
logRouter("/signin", validateSchema(signinSchema), doSignin)

export default signRouter;