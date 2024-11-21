import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import PdfPreview from "../components/PdfPreview";
import axios from "axios";

const Home: React.FC = () => {
  const [fileData, setFileData] = useState<any | null>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");

  const handleExtract = async (selectedPages: number[]) =>{
    if(!fileData){
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/pdf/extract`, {
        pageIndexes: selectedPages,
          fileName: fileData.fileName, 
      },
      { responseType: "arraybuffer" });

     // Convert the binary response to a Blob
     console.log(response.data)
     if (response.data.byteLength <= 0) {
      throw new Error("Received invalid PDF data");
    }

    // Convert the binary response to a Blob
     const extractedPdfBlob = new Blob([response.data], { type: "application/pdf" });

     const downloadUrl = URL.createObjectURL(extractedPdfBlob);

     setDownloadLink(downloadUrl);
  } catch (error) {
      console.error("Error extracting PDF:", error);
  }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!fileData ? (
        <FileUpload onUploadSuccess={setFileData} />
      ) : (
        <PdfPreview fileData={fileData.fileData} downloadLink={downloadLink} onExtract={handleExtract} />
      )}
    </div>
  );
};

export default Home;
