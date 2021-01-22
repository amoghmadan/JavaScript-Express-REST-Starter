import { Router } from "express";
import { rootController } from "../controllers";

const router = Router();

router.get("/", rootController.helloWorld);

export default router;
