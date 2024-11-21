import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import path from "path";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

export const uploadPdf = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new CustomError("No file uploadedd", 400);
    }

    const filePath = path.resolve(req.file.path);
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });

    res.status(200).json({
      message: "File uploaded successfully",
      fileName: req.file.filename,
      filePath: filePath,
      fileData: `data:application/pdf;base64,${fileData}`, // Base64 representation for frontend preview
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const extractPdfPages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fileName, pageIndexes } = req.body;

    if (!fileName || !Array.isArray(pageIndexes)) {
      throw new CustomError("File name and page indexes are required", 400);
    }

    const filePath = path.resolve("src/uploads", fileName);

    if (!fs.existsSync(filePath)) {
      throw new CustomError("PDF file not found", 404);
    }
    // Read the existing PDF
    const existingPdf = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdf);

    // Create a new PDF with selected pages
    const newPdf = await PDFDocument.create();
    for (const index of pageIndexes) {
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [index]);
      newPdf.addPage(copiedPage);
    }

    const newPdfBytes = await newPdf.save();

    // Saving the new PDF temporarily
    const newPdfName = `extracted-${Date.now()}.pdf`;
    const newPdfPath = path.resolve("src/uploads", newPdfName);
    fs.writeFileSync(newPdfPath, newPdfBytes);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=extracted.pdf");

    // Send the extracted PDF as a Buffer
    const readStream = fs.createReadStream(newPdfPath);
    readStream.pipe(res);
  } catch (error: any) {
    next(error);
  }
};

