import Router from "express";
import signRouter from "./signRouter.js";
import urlsRouter from "./urlRouter.js"
import userRouter from "./userRouter.js"
const router = Router();

router.use(signRouter);
router.use(urlsRouter);
router.use(userRouter);

export default router;