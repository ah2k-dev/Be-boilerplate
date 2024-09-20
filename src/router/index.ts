import express, {Router} from "express";
import auth from "./auth";
const router: Router = express.Router();

router.use("/auth", auth);

export default router;
