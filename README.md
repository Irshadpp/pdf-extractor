# PDF Page Extractor

A web application that allows users to upload a PDF, preview its pages, select specific pages, and download a new PDF containing only the selected pages. 

## Features

- Upload and preview PDF pages
- Select pages for extraction with an intuitive interface
- Download the extracted pages as a new PDF
- Responsive and user-friendly design

## Tech Stack

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Node.js with TypeScript and `pdf-lib`
- **PDF Rendering**: `pdfjs-dist`
- **Styling**: Tailwind CSS

---

## Live Demo

Try the live version here: [https://pdf-extractor-bay.vercel.app/](https://pdf-extractor-bay.vercel.app)

---

## Installation and Setup

Follow the instructions below to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- A package manager: `npm` or `yarn`

---

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a .env file in the client directory and add the following environment variable:
    ```bash
    VITE_SERVER_URL=http://localhost:3000
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
The client will run on http://localhost:5173.

### Backend Setup

1. Navigate to the server directory:
    ```bash
    cd server
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a .env file in the server directory and add the following environment variable:
    ```bash
    PORT=3000
    ```
4. Start the backend server:
     ```bash
    npm start
    ```
The backend will run on http://localhost:3000.

### Usage

1. Start both the frontend and backend servers as instructed above.
2. Open the client in your browser: http://localhost:5173.
3. Upload a PDF file.
4. Select pages by clicking on them. Selected pages will show a tick mark in the top-right corner.
5. Click the "Extract PDF" button to process the selection.
6. Download the newly generated PDF with only the selected pages.

### Scripts

## Frontend
npm run dev: Starts the frontend development server.
npm run build: Builds the frontend for production.
npm run preview: Previews the built production app.

## Backend
npm start: Starts the backend in development mode.
npm run build: Builds the backend for production.

