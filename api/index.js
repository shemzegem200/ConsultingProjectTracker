const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Consulting Project Tracker API",
      version: "1.0.0",
      description: "API documentation for project storing, user auth, prefetching, etc.",
      contact: {
        name: "Shyam Sainarayanan Varadharajan",
      },
    },
    servers: [
      {
        url: `http://localhost:4000`,
      },
    ],
  },
  apis: ["./index.js"],
};

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("./cloudinary");
const {Readable} = require("stream");
const sendReminderEmail = require('./nodemailer');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
//just be importing, the schedulling happens
require('./reminderScheduler');
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const upload = multer({ storage: multer.memoryStorage() });
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
const GOOGLE_SHEET_PROJECT_URL = process.env.GOOGLE_SHEET_PROJECT_URL;
const PORT = process.env.PORT;


async function hashPassword(plainPassword) {
  const saltRounds = 10; // Number of salt rounds (recommended: 10-12)
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  // console.log("Hashed Password:", hashedPassword);
  return hashedPassword;
}

async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  // console.log("Password Match:", isMatch);
  return isMatch;
}

// Helper to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // for PDFs and other non-image files
        public_id: `projects/${filename.split('.')[0]}`
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

//sign up api call
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user.
 *     description: This endpoint allows a new user to sign up by providing a username, password, role, and optionally their GitHub and LinkedIn profiles.
 *     parameters:
 *       - name: username
 *         in: body
 *         description: The username of the user.
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         description: The password for the user account.
 *         required: true
 *         type: string
 *       - name: role
 *         in: body
 *         description: The role of the user (e.g., student, supervisor, etc.).
 *         required: true
 *         type: string
 *       - name: github
 *         in: body
 *         description: The GitHub profile URL of the user (optional).
 *         required: false
 *         type: string
 *       - name: linkedin
 *         in: body
 *         description: The LinkedIn profile URL of the user (optional).
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: User successfully created
 *       400:
 *         description: Username already taken or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Username already taken
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing the request
 */
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Fetch existing records
    const getResponse = await axios.get(GOOGLE_SHEET_WEBHOOK_URL);
    const existingUsers = getResponse.data;

    // Step 2: Check if username already exists
    const userExists = existingUsers.some(user => user.username === username);

    if (userExists) {
      return res.status(400).json({ status: "Error", message: "Username already taken" });
    }

    // Step 3: Hash password and submit new user
    const hashed = await hashPassword(password);
    const obj = { ...req.body, password: hashed };

    const postResponse = await axios.post(GOOGLE_SHEET_WEBHOOK_URL, obj);
    res.json(postResponse.data);

  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

//login api call
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   description: User data
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */
app.post("/signin", async (req, res) => { 
  try {
    const { password, username } = req.body;
    const response = await axios.get(GOOGLE_SHEET_WEBHOOK_URL);
    const users = response.data;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

//get userinfo based on username alone (after signing in)
/**
 * @swagger
 * /get-user-info:
 *   post:
 *     summary: Get detailed user info including assigned projects
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               role:
 *                 type: string
 *                 enum: [user, supervisor]
 *                 example: "user"
 *     responses:
 *       200:
 *         description: User information and related projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User object including project list
 *                   properties:
 *                     username:
 *                       type: string
 *                     password:
 *                       type: string
 *                     linkedin:
 *                       type: string
 *                     github:
 *                       type: string
 *                     role:
 *                       type: string
 *                     projects:
 *                       type: array
 *                       description: List of projects associated with the user
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: AI Research Project
 *                           industry:
 *                             type: string
 *                             example: Education
 *                           duration:
 *                             type: number
 *                             example: 3
 *                           year:
 *                             type: number
 *                             example: 2024
 *                           piName:
 *                             type: string
 *                             example: Gopalan Varadharajan
 *                           piEmail:
 *                             type: string
 *                             example: gopalan_varad@yahoo.com
 *                           cpiName:
 *                             type: string
 *                             example: Gopalan Varadharajan
 *                           cpiEmail:
 *                             type: string
 *                             example: gopalan_varad@yahoo.com
 *                           amtSanct:
 *                             type: number
 *                             example: 57000
 *                           amtRecv:
 *                             type: number
 *                             example: 48500
 *                           summary:
 *                             type: string
 *                             example: The project integrates VR, XR to make learning immersive...
 *                           progress:
 *                             type: string
 *                             enum: [Ongoing, Completed]
 *                             example: "Ongoing"
 *                           students:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 username:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error while retrieving user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: Unexpected error occurred
 */
app.post("/get-user-info", async(req, res)=>{
  try {
    const {username, role} = req.body;
    // console.log(role);
    const response = await axios.get(GOOGLE_SHEET_WEBHOOK_URL);
    const users = response.data;
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Error", message: "User not found" });
    }
    //here, query through another table by the link GOOGLE_SHEET_PROJECT_URL
    //choose the records if the 'students' columns contains the username
    const projectResponse = await axios.get(GOOGLE_SHEET_PROJECT_URL);
    const rawData = projectResponse.data;
    // console.log(rawData)
    
    // Ensure it's an array
    const allProjects = Array.isArray(rawData) ? rawData : Object.values(rawData);
    // console.log(allProjects)
    // Filter projects where students (JSON string) includes this username
    const userProjects = allProjects.filter((project) => {
      try {
        if (role==='supervisor'){
          console.log("Checking project:", project.piEmail, project.cpiEmail);
          if (project.piEmail===username || project.cpiEmail===username){
            const parsedStudents = JSON.parse(project.students); // 2D array
            const flatStudents = parsedStudents.flat();
            project.students = flatStudents;
            return true;
          }
          return false;
        }
        const parsedStudents = JSON.parse(project.students); // 2D array
        const flatStudents = parsedStudents.flat();
        const isUserIncluded = flatStudents.some((student) => student.username === username); 
        if (isUserIncluded) {
          project.students = flatStudents; // Replace string with parsed array
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    });
    user.projects = userProjects;
    res
      .status(200)
      .json({user});
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

//store project api call
/**
 * @swagger
 * /store-project:
 *   post:
 *     summary: Store a new consulting project with file uploads
 *     tags: [Project]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: string
 *                 format: JSON
 *                 description: Stringified JSON containing project details including student usernames
 *                 example: '{"title":"AI for Healthcare","industry":"Health","duration":"6 months","year":"2024","amtSanct":"50000","students":[{"username":"cs22b999"},{"username":"cs22b888"}],"piEmail":"prof1@iitm.ac.in","piName":"Prof A","cpiEmail":"prof2@iitm.ac.in","cpiName":"Prof B"}'
 *               file1:
 *                 type: string
 *                 format: binary
 *                 description: file 1 to upload (e.g., invoice)
 *               file2:
 *                 type: string
 *                 format: binary
 *                 description: file 2 to upload (e.g., agreement document)
 *     responses:
 *       200:
 *         description: Project stored successfully and confirmation emails sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project stored successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     students:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *       400:
 *         description: Missing form data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing form data
 *       500:
 *         description: Server error while storing project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: Internal server error
 */
app.post("/store-project", upload.fields([
  { name: "file1", maxCount: 1 },
  { name: "file2", maxCount: 1 },]),
  async(req, res)=>{
  try{
    const rawData = req.body.data;
    if (!rawData) return res.status(400).json({ error: "Missing form data" });

    const projectData = JSON.parse(rawData);

    console.log(JSON.stringify(projectData));

    const temp = await axios.get(`${GOOGLE_SHEET_WEBHOOK_URL}`);
    const allStudents = temp.data;

    // Fetch full student data for each student
    const fullStudentData = await Promise.all(
      projectData.students.map(async (student) => {
        for (const stud of allStudents){
          if (stud.username===student.username) return stud;
        }
        return {};
      })
    );
    console.log('im here');
    console.log(fullStudentData);

    const file1 = req.files['file1']?.[0];
    const file2 = req.files['file2']?.[0];
    const uploadedFiles = {};
    if (file1) {
      const result1 = await uploadToCloudinary(file1.buffer, file1.originalname);
      uploadedFiles.file1 = result1.secure_url;
    }
    if (file2) {
      const result2 = await uploadToCloudinary(file2.buffer, file2.originalname);
      uploadedFiles.file2 = result2.secure_url;
    }
    console.log("Project Data:", projectData);
    console.log("Uploaded File URLs:", uploadedFiles);
    
    const obj = {...projectData, students: JSON.stringify(fullStudentData), file1: uploadedFiles.file1, file2: uploadedFiles.file2, progress: 'Ongoing', date: new Date().toISOString()};
    console.log(obj);

    const result = await axios.post(GOOGLE_SHEET_PROJECT_URL, obj);
    console.log(result.data);
    console.log(fullStudentData);
    
      for (const stud of fullStudentData.flat()){
        const subject = `Project Stored Successfully: ${projectData.title}`;
        const message = `
          Hello ${stud.name},

          The project titled "${projectData.title}" has been successfully stored.

          Summary:
          - Industry: ${projectData.industry}
          - Duration: ${projectData.duration}
          - Year: ${projectData.year}
          - Students: ${projectData.students.map(s => s.username).join(', ')}
          - Amount Sanctioned: ${projectData.amtSanct}
          - Status: Ongoing

          You may access the uploaded files here:
          - File 1: ${uploadedFiles.file1 || "Not uploaded"}
          - File 2: ${uploadedFiles.file2 || "Not uploaded"}

          Best regards,  
          Consulting Project Dashboard Team
                `;
        await sendReminderEmail(stud.username, subject, message);
      }

    if (projectData.piEmail){
        const subject = `Project Stored Successfully: ${projectData.title}`;
        const message = `
          Hello ${projectData.piName},

          The project titled "${projectData.title}" has been successfully stored.

          Summary:
          - Industry: ${projectData.industry}
          - Duration: ${projectData.duration}
          - Year: ${projectData.year}
          - Students: ${projectData.students.map(s => s.username).join(', ')}
          - Amount Sanctioned: ${projectData.amtSanct}
          - Status: Ongoing

          You may access the uploaded files here:
          - File 1: ${uploadedFiles.file1 || "Not uploaded"}
          - File 2: ${uploadedFiles.file2 || "Not uploaded"}

          Best regards,  
          Consulting Project Dashboard Team
                `;
        await sendReminderEmail(projectData.piEmail, subject, message);
    }
    if (projectData.cpiEmail){
      const subject = `Project Stored Successfully: ${projectData.title}`;
      const message = `
        Hello ${projectData.cpiName},

        The project titled "${projectData.title}" has been successfully stored.

        Summary:
        - Industry: ${projectData.industry}
        - Duration: ${projectData.duration}
        - Year: ${projectData.year}
        - Students: ${projectData.students.map(s => s.username).join(', ')}
        - Amount Sanctioned: ${projectData.amtSanct}
        - Status: Ongoing

        You may access the uploaded files here:
        - File 1: ${uploadedFiles.file1 || "Not uploaded"}
        - File 2: ${uploadedFiles.file2 || "Not uploaded"}

        Best regards,  
        Consulting Project Dashboard Team
              `;
      await sendReminderEmail(projectData.cpiEmail, subject, message);
    }
    res.status(200).json({ message: "Project stored successfully", data: {...result.data.inserted, students:projectData.students}});
  }
  catch(err){
    res.status(500).json({err: err.message});
  }
});

//put to update project info based on project.id
/**
 * @swagger
 * /update-project:
 *   put:
 *     summary: Update an existing consulting project based on project ID
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - industry
 *               - duration
 *               - year
 *               - amtSanct
 *               - progress
 *               - students
 *             properties:
 *               id:
 *                 type: number
 *                 description: Unique project ID number
 *                 example: 294371
 *               title:
 *                 type: string
 *                 example: "Updated AI for Healthcare"
 *               industry:
 *                 type: string
 *                 example: "Health"
 *               duration:
 *                 type: number
 *                 example: 8
 *               year:
 *                 type: number
 *                 example: 2025
 *               amtSanct:
 *                 type: number
 *                 example: 60000
 *               progress:
 *                 type: string
 *                 enum: [Ongoing, Completed]
 *                 example: "Completed"
 *               students:
 *                 type: array
 *                 description: List of student objects to notify
 *                 items:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "jd@gmail.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *     responses:
 *       200:
 *         description: Project updated successfully and email notifications sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: "success"
 *                 message: "Project updated"
 *       400:
 *         description: Missing required fields (like project ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing 'id' in request body
 *       500:
 *         description: Internal server error during project update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: Internal server error
 */
app.put("/update-project", async(req, res)=>{
  try{
    const obj = req.body;
    const students = obj.students;
    delete obj.students;
    if (!obj.id) {
      return res.status(400).json({ error: "Missing 'id' in request body" });
    }
    console.log(obj);
    const response = await fetch(`${GOOGLE_SHEET_PROJECT_URL}?action=update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(response);
    const result = await response.json();

    console.log(students);
    for (const stud of students){
      const subject = `Project Updated Successfully: ${obj.title}`;
      const message = `
          Hello ${stud.name},

          The project titled "${obj.title}" has been successfully stored.

          Summary:
          - Industry: ${obj.industry}
          - Duration: ${obj.duration}
          - Year: ${obj.year}
          - Students: ${students.map(s => s.username).join(', ')}
          - Amount Sanctioned: ${obj.amtSanct}
          - Status: ${obj.progress}

          Best regards,  
          Consulting Project Dashboard Team
                `;
        await sendReminderEmail(stud.username, subject, message);
    }
    res.status(200).json(result);
  }
  catch(err){
    res.status(500).json({err: err.message});
  }
});

//delete project based on ID
/**
 * @swagger
 * /delete-project:
 *   delete:
 *     summary: Delete a consulting project by its ID
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique project ID
 *                 example: 123456
 *               title:
 *                 type: string
 *                 description: Title of the project (for notification email)
 *                 example: "Smart City Analytics"
 *               students:
 *                 type: array
 *                 description: List of students associated with the project
 *                 items:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "cs22b@gmail.com"
 *                     name:
 *                       type: string
 *                       example: "Jane Doe"
 *               piEmail:
 *                 type: string
 *                 example: "pi@example.com"
 *               piName:
 *                 type: string
 *                 example: "Prof. X"
 *               cpiEmail:
 *                 type: string
 *                 example: "co-pi@example.com"
 *               cpiName:
 *                 type: string
 *                 example: "Prof. Y"
 *     responses:
 *       200:
 *         description: Project deleted successfully and email notifications sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: "success"
 *                 message: "Project deleted"
 *       400:
 *         description: Missing project ID in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing 'id' in request body"
 *       500:
 *         description: Internal server error during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: "Internal server error"
 */
app.delete("/delete-project", async(req, res)=>{
  try{
    const obj = req.body;
    if (!obj.id) {
      return res.status(400).json({ error: "Missing 'id' in request body" });
    }
    console.log(obj);
    const response = await fetch(`${GOOGLE_SHEET_PROJECT_URL}?action=delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: obj.id}),
    });
    console.log(response);
    const result = await response.json();

    for (const stud of obj.students){
      const subject = `Project Deleted Successfully: ${obj.title}`;
      const message = `
          Hello ${stud.name},

          The project titled "${obj.title}" has been successfully deleted.

          Best regards,  
          Consulting Project Dashboard Team
                `;
        await sendReminderEmail(stud.username||stud.email, subject, message);
    }
    if(obj.piEmail){
      const subject = `Project Deleted Successfully: ${obj.title}`;
      const message = `
          Hello ${obj.piName},

          The project titled "${obj.title}" has been successfully deleted.

          Best regards,  
          Consulting Project Dashboard Team
                `;
        await sendReminderEmail(obj.piEmail, subject, message);
    }
    if(obj.cpiEmail){
      const subject = `Project Deleted Successfully: ${obj.title}`;
      const message = `
          Hello ${obj.cpiName},

          The project titled "${obj.title}" has been successfully deleted.

          Best regards,  
          Consulting Project Dashboard Team
                `;
        await sendReminderEmail(obj.cpiEmail, subject, message);
    }
    res.status(200).json(result);
  }
  catch(err){
    res.status(500).json({err: err.message});
  }
});

//get general project details for dashboard and Searching
/**
 * @swagger
 * /prefetch-project-info:
 *   get:
 *     summary: Fetch all consulting projects for dashboard and search
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Successfully fetched all project metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123456
 *                   title:
 *                     type: string
 *                     example: "AI in Manufacturing"
 *                   industry:
 *                     type: string
 *                     example: "Manufacturing"
 *                   duration:
 *                     type: string
 *                     example: 6
 *                   year:
 *                     type: string
 *                     example: 2024
 *                   piName:
 *                     type: string
 *                     example: "Prof. Rajesh"
 *                   piEmail:
 *                     type: string
 *                     example: "rajesh@example.com"
 *                   cpiName:
 *                     type: string
 *                     example: "Prof. Meera"
 *                   cpiEmail:
 *                     type: string
 *                     example: "meera@example.com"
 *                   amtSanct:
 *                     type: string
 *                     example: 500000
 *                   summary:
 *                     type: string
 *                     example: "Project focuses on predictive maintenance using ML."
 *                   progress:
 *                     type: string
 *                     enum: [Ongoing, Completed]
 *                     example: "Ongoing"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-01T10:15:30.000Z"
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: "cs22@example.com"
 *                         name:
 *                           type: string
 *                           example: "Anjali S"
 *       500:
 *         description: Failed to fetch project data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: "Internal server error"
 */
app.get("/prefetch-project-info", async(req, res)=>{
  try{
    const projectResponse = await axios.get(GOOGLE_SHEET_PROJECT_URL);
    const rawData = projectResponse.data;
    const allProjects = Array.isArray(rawData) ? rawData : Object.values(rawData);
    const results = allProjects.map(p => ({
                                          "id": p.id,
                                          "title": p.title,
                                          "industry": p.industry,
                                          "duration": p.duration,
                                          "year": p.year,
                                          "piName": p.piName,
                                          "piEmail": p.piEmail,
                                          "cpiName": p.cpiName,
                                          "cpiEmail": p.cpiEmail,
                                          "amtSanct": p.amtSanct,
                                          // "amtRecv": p.amtRecv,
                                          "summary": p.summary,
                                          "progress": p.progress,
                                          "date": p.date,
                                          "students": JSON.parse(p.students).flat()
                                        }));
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json(results);
  }
  catch(err){
    res.status(500).json({err: err.message});
  }
});

//notify the students with the message from supervisor
/**
 * @swagger
 * /notify-students:
 *   post:
 *     summary: Notify all students associated with a project with a message from the supervisor
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project
 *               - message
 *             properties:
 *               project:
 *                 type: object
 *                 required:
 *                   - title
 *                   - students
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "AI in Healthcare"
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: "cs2@example.com"
 *                         name:
 *                           type: string
 *                           example: "Anjali S"
 *               message:
 *                 type: string
 *                 example: "Please make sure to submit your final report by Friday."
 *     responses:
 *       200:
 *         description: Notification emails sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification emails sent successfully!
 *       400:
 *         description: Missing project or message, or no student emails found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No student emails found in the project.
 *       500:
 *         description: Internal server error while sending notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   example: Internal server error
 */
app.post("/notify-students", async(req, res)=>{
  try{
    console.log('im here');
    const {project, message} = req.body;
    console.log('im here again');
    if (!project || !message) {
      return res.status(400).json({ error: "Project and message are required." });
    }
    console.log('reached here1');
    const studentEmails = project.students?.map(student => student.username).filter(Boolean);
    console.log('reached here2');
    if (!studentEmails || studentEmails.length === 0) {
      return res.status(400).json({ error: "No student emails found in the project." });
    }
    console.log('reached here3');
    const subject = `Message from Supervisor - ${project.title || "Project Update"}`;
    // Send emails in parallel
    await Promise.all(
      studentEmails.map(email => sendReminderEmail(email, subject, message))
    );
    console.log('reached here4');
    res.status(200).json({ message: "Notification emails sent successfully!" });
  }
  catch(err){
    console.error("Error in /notify-students:", err);
    res.status(500).json({err: err.message});
  }
});

//to download the Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocs);
});

app.listen(PORT, () => console.log("Server running on port",PORT));