# Project Setup Instructions

## 🔧 How to Run Backend
1. First, add the `.env` file in the `api` directory.
2. Then, run the following commands:

```bash
cd api
npm install
node index.js

🎨 How to Run Frontend

Navigate to the client directory and start the development server:

cd clients
npm install -g yarn
yarn install
yarn run dev

📘 API Documentation

You can view the full API documentation by visiting:

https://consultingprojecttracker-1.onrender.com/api-docs/

> Swagger UI is used for documenting the API.




---

🚀 Backend Features

Built with Express in a Node.js environment.

Uses nodemailer to send email notifications to users.

Integrates Cloudinary for uploading and storing PDF files in the cloud.

Utilizes Google Sheets as the primary database, manipulated via Apps Script.

Implements bcrypt for password hashing and security.

Uses multer middleware for handling file uploads.

Employs node-cron to schedule reminder emails every 15 days.


📊 Database Links (Read-only)

Projects DB: Projects Sheet

Users DB: Users Sheet


🧩 Modules Used (Backend)

express, axios, cors, body-parser, cloudinary, dotenv, multer, node-cron, nodemailer, stream, swagger-jsdoc, swagger-ui-express


---

🎯 Frontend Features

Two user roles: User and Supervisor

User functionalities:

Create, update, and delete projects

Receive notifications after performing actions

View all projects and personal projects

Filter projects based on supervisor, industry, duration, amount, year, and progress

Download project pages as PDF


Supervisor functionalities:

View all peer projects

Verify documents and notify users

Update billing status and project progress (ongoing/completed)



✅ General Frontend Features

Persistent login system

Caching of API calls using local storage for faster UX

Interactive dashboard with graphs using recharts

Dynamic sidebar for navigation

Filtering options across multiple attributes

Icons integrated from react-icons/fa


🧩 Modules Used (Frontend)

react-router-dom, html2canvas, date-fns, jspdf, react-icons, recharts, styled-components


---

⚙️ Future Improvements

Make the application fully mobile responsive




