import express from "express";
import { upload } from "../utils/multer-handler";
import { extractPdfPages, uploadPdf } from "../controller/pdf.controller";

const router = express.Router();
  
router.post("/upload",upload.single("file"), uploadPdf);

router.post("/extract", extractPdfPages);

//todo after authentication
// router.get("/",getPdf);

export {router as PdfRouter};