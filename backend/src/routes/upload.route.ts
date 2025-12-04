import { Router } from "express";
import multer from "multer";
import { uploadPDF } from "../controllers/upload.controller";

const router = Router();

// memory storage -> lets us access req.file.buffer
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), uploadPDF);

export default router;
