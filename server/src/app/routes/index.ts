import express from "express";
import { PdfRouter } from "./pdf.routes";

const router = express.Router();

router.use("/pdf", PdfRouter)

export {router as appRouter};