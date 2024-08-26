This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Grid Component with Pagination, Search, Filter, and Undo/Redo Functionality

This project is a React-based grid component designed to handle large datasets efficiently. The grid includes features such as pagination, search/filter functionality, and undo/redo capabilities, providing a flexible and user-friendly interface for editing tabular data.

## Features

- **Pagination:** Efficiently handles large datasets by displaying data in pages.
- **Search Functionality:** Allows users to search and highlight matching cells within the grid.
- **Undo/Redo:** Users can revert or reapply changes made to the grid cells.

## Getting Started

### Prerequisites

- **Node.js** (v12 or later)
- **npm** or **yarn** (for package management)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/grid-component.git
   cd spreadsheet

2. **Install the dependencies:**

    npm install

## Running the Project

1. Start the development server:

    npm start

2. Open your browser and navigate to:

    http://localhost:3000

    The grid component should now be visible and interactive.  

## Usage Instructions

1. Pagination:
Navigation: Use the "Previous" and "Next" buttons at the bottom of the grid to navigate through the pages.
Page Info: The current page number and total pages are displayed between the navigation buttons.

2. Search:
Search Bar: Enter any text in the search bar located at the top left of the grid. Cells containing the search query will be highlighted in yellow.

3. Undo/Redo:
Undo: Click the "Undo" button to revert the most recent change to the grid.
Redo: Click the "Redo" button to reapply the most recent undone change.

4. Cell Editing:
Editing Cells: Click on any cell to edit its contents. The grid supports changes in text alignment and font size.
Formatting: Use the dropdowns to adjust the text alignment and font size for the entire grid.
Project Structure

src/components/Grid.js: Contains the main grid component logic.
src/App.js: The entry point for rendering the grid in the application.
public/: Contains static assets, including the index.html file.
package.json: Lists project dependencies and scripts
