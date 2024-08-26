"use client";

import React, { useEffect, useMemo } from 'react';
import useStore from '../store/store';

const Grid = () => {
  const totalRows = 320;
  const columns = 32;
  const rowsPerPage = 32;

  const {
    gridData,
    currentPage,
    setCurrentPage,
    setGridData,
    setSelectedCells,
    setSelectedAlignment,
    setSelectedFontSize,
    setSearchQuery,
    searchQuery,
    selectedAlignment,
    selectedFontSize,
    handleUndo,        
    handleRedo,        
  } = useStore((state) => ({
    gridData: state.gridData,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
    setGridData: state.setGridData,
    setSelectedCells: state.setSelectedCells,
    setSelectedAlignment: state.setSelectedAlignment,
    setSelectedFontSize: state.setSelectedFontSize,
    setSearchQuery: state.setSearchQuery,
    searchQuery: state.searchQuery,
    selectedAlignment: state.selectedAlignment,
    selectedFontSize: state.selectedFontSize,
    handleUndo: state.handleUndo,  // Map undo function from the store
    handleRedo: state.handleRedo,  // Map redo function from the store
  }));

  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRowIndex = (currentPage - 1) * rowsPerPage;
  const endRowIndex = Math.min(startRowIndex + rowsPerPage, totalRows);
  const rowsToDisplay = gridData.slice(startRowIndex, endRowIndex);

  // Handle cell click for selecting multiple cells
  const handleCellClick = (rIdx, cIdx, event) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedCells((prevSelectedCells) => [
        ...prevSelectedCells,
        { row: rIdx, col: cIdx }
      ]);
    } else {
      setSelectedCells([{ row: rIdx, col: cIdx }]); // Single selection on click
    }
  };

  const handleCellChange = (rowIndex, colIndex, newValue) => {
    const updatedGridData = JSON.parse(JSON.stringify(gridData)); // Make a deep copy of the grid data
    updatedGridData[rowIndex][colIndex] = {
      ...updatedGridData[rowIndex][colIndex],
      value: newValue,
    };
    setGridData(updatedGridData); // Update the grid data
  };

  // Highlight matching cells based on search query across all pages
  const getCellStyle = (textAlign, fontSize, highlighted, rIdx, cIdx, cellValue) => {
    let backgroundColor = 'transparent';

    // Highlight cells matching the search query
    if (searchQuery && cellValue.toLowerCase().includes(searchQuery.toLowerCase())) {
      backgroundColor = 'yellow';
    }

    // Highlight selected cells
    const isSelected = useStore.getState().selectedCells.some(
      cell => cell.row === rIdx && cell.col === cIdx
    );
    if (isSelected) {
      backgroundColor = 'lightblue';
    }

    return {
      textAlign,
      fontSize,
      padding: '0.5rem',
      backgroundColor,
    };
  };

  const getColumnLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-4 overflow-auto bg-gray-100">
      {/* Search and Formatting Controls */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedAlignment}
          onChange={(e) => setSelectedAlignment(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="left">Left Align</option>
          <option value="center">Center Align</option>
          <option value="right">Right Align</option>
        </select>
        <select
          value={selectedFontSize}
          onChange={(e) => setSelectedFontSize(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Medium</option>
          <option value="text-lg">Large</option>
        </select>
        <button
          onClick={handleUndo}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Redo
        </button>
      </div>

      {/* Scrollable horizontal container */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[50px_repeat(32,_minmax(150px,_1fr))] grid-rows-[50px_repeat(32,_minmax(0,_1fr))] gap-1">
          {/* Column headers */}
          <div></div> {/* Empty cell for the top-left corner */}
          {Array.from({ length: columns }, (_, c) => (
            <div key={`col-${c}`} className="text-center font-bold bg-blue-500 text-white p-2">
              {getColumnLetter(c)}
            </div>
          ))}

          {/* Row headers and grid cells */}
          {rowsToDisplay.map((row, rIdx) => (
            <React.Fragment key={`row-${rIdx + startRowIndex}`}>
              <div className="text-center font-bold bg-blue-500 text-white p-2">
                {rIdx + startRowIndex + 1}
              </div>
              {row.map((cell, cIdx) => (
                <input
                  key={`cell-${rIdx + startRowIndex}-${cIdx}`}
                  value={cell.value}
                  onClick={(e) => handleCellClick(rIdx + startRowIndex, cIdx, e)} // Select multiple cells
                  onChange={(e) => handleCellChange(rIdx + startRowIndex, cIdx, e.target.value)}
                  className={`border border-gray-400 p-2 text-center ${selectedFontSize} focus:outline-none`}
                  style={getCellStyle(
                    selectedAlignment,
                    selectedFontSize,
                    false,
                    rIdx + startRowIndex,
                    cIdx,
                    cell.value
                  )}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Grid;
