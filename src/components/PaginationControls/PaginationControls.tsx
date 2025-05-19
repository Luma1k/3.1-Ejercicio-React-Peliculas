"use client";

import React from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-5 py-2 rounded-md font-semibold transition-all ${
          page === 1
            ? "bg-[#134e4a] text-gray-300 cursor-not-allowed"
            : "bg-[#10b981] hover:bg-[#059669] text-white"
        }`}
      >
        Prev
      </button>

      <span className="text-lg font-medium text-white">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-5 py-2 rounded-md font-semibold transition-all ${
          page === totalPages
            ? "bg-[#134e4a] text-gray-300 cursor-not-allowed"
            : "bg-[#10b981] hover:bg-[#059669] text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
