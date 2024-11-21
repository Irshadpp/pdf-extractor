import React, { useState } from "react";

interface PageSelectorProps {
  numPages: number;
  onExtract: (selectedPages: number[]) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ numPages, onExtract }) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const togglePageSelection = (page: number) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const handleExtract = () => {
    if (selectedPages.length === 0) {
      alert("Please select at least one page");
      return;
    }
    onExtract(selectedPages);
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Pages to Extract</h2>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: numPages }, (_, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              value={index + 1}
              onChange={() => togglePageSelection(index + 1)}
              className="mr-2"
            />
            Page {index + 1}
          </label>
        ))}
      </div>
      <button
        onClick={handleExtract}
        className="mt-4 w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
      >
        Extract Pages
      </button>
    </div>
  );
};

export default PageSelector;
