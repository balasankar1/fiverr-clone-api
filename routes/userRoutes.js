import express from "express";
import { deleteUser } from "../controllers/userControllers.js";
const router = express.Router();

router.get("/", deleteUser);

export default router;
