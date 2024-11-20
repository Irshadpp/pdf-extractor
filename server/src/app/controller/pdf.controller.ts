import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import path from "path";
import fs from "fs";
import {PDFDocument} from "pdf-lib";

export const uploadPdf = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new CustomError("No file uploadedd", 400);
    }

    const filePath = path.resolve(req.file.path);
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });

    res.status(200).json({
      message: "File uploaded successfully",
      data: {
        fileName: req.file.filename,
        filePath: filePath,
        fileData: `data:application/pdf;base64,${fileData}`, // Base64 representation for frontend preview
      },
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const extractPdfPages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fileName, pageIndexes } = req.body;

    if (!fileName || !Array.isArray(pageIndexes)) {
      res
        .status(400)
        .json({ message: "File name and page indexes are required" });
      return;
    }

    const filePath = path.resolve("src/uploads", fileName);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: "PDF file not found" });
      return;
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

    // Respond with the new PDF file path
    res.status(200).json({
      message: "PDF extracted successfully",
      data: {
        fileName: newPdfName,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const downloadPdf = (req: Request, res: Response): void => {
    try {
      const { fileName } = req.params;
  
      if (!fileName) {
        res.status(400).json({ message: "File name is required" });
        return;
      }
  
      const filePath = path.resolve("src/uploads", fileName);
  
      if (!fs.existsSync(filePath)) {
        res.status(404).json({ message: "File not found" });
        return;
      }
  
      // Set headers and send the file for download
      res.download(filePath, fileName, (err) => {
        if (err) {
          res.status(500).json({ message: "Failed to download the file" });
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Internal Server Error" });
    }
  };

// export const getPdf = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.status(200).json({
//       message: "File uploaded successfully",
//     });
//   } catch (error: any) {
//     console.log(error);
//     next(error);
//   }
// };
