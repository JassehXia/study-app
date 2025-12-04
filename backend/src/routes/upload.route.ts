import { Router } from "express";
import { uploadPDF } from "../controllers/upload.controller";
import multer from "multer";

const router = Router();

// Memory storage for uploaded PDFs
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadPDF);

export default router;
