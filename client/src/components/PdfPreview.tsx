import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

const PdfPageSelector = ({ fileData, downloadLink, onExtract }: { fileData: string; downloadLink: string; onExtract: (pages: number[]) => void }) => {
    const [pages, setPages] = useState<string[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);

    useEffect(() => {
        const renderPages = async () => {
            const pdf = await pdfjsLib.getDocument(fileData).promise;
            const renderedPages: string[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                renderedPages.push(canvas.toDataURL());
            }

            setPages(renderedPages);
        };

        renderPages();
    }, [fileData]);

    const toggleSelection = (index: number) => {
        setSelectedPages((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };
    console.log(selectedPages)

    const handleExtract = () => {
        onExtract(selectedPages);
    };

    return (
        <div className="w-full text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                {pages.map((src, index) => (
                    <div
                        key={index}
                        onClick={() => toggleSelection(index + 1)}
                        className={`relative cursor-pointer transition-transform transform hover:scale-105 rounded-md ${
                            selectedPages.includes(index + 1)
                                ? "border-4 border-blue-500 shadow-lg"
                                : "border-2 border-gray-300"
                        }`}
                    >
                        <img
                            src={src}
                            alt={`Page ${index + 1}`}
                            className="w-80 h-auto rounded-md"
                        />
                        <p className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 p-1 rounded-md">
                            Page {index + 1}
                        </p>
                    </div>
                ))}
            </div>
            <div className="text-center">
                {selectedPages.length > 0 && (
                    <div>
                        <p className="text-lg mb-2">Selected Pages: {selectedPages.join(", ")}</p>
                        <button
                            onClick={handleExtract}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Extract PDF
                        </button>
                    </div>
                )}
                 {downloadLink && (
            <a
                href={downloadLink}
                download
                className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Download Extracted PDF
            </a>
        )}
            </div>
        </div>
    );
};

export default PdfPageSelector;
