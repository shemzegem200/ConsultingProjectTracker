const cron = require('node-cron');
const sendReminderEmail = require('./nodemailer.js');
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
const GOOGLE_SHEET_PROJECT_URL = process.env.GOOGLE_SHEET_PROJECT_URL;

// Every 15 days at 9am
// cron.schedule('*/2 * * * *', async () => { //testing purposes
cron.schedule('0 9 */15 * *', async () => {
  console.log('Sending reminder emails...');
  try {
    const usersData = await axios.get(GOOGLE_SHEET_WEBHOOK_URL);
    const users = usersData.data;
    const projectsData = await axios.get(GOOGLE_SHEET_PROJECT_URL);
    const projects = projectsData.data;
    let projText = '';
    let i=0;
    for (const user of users) {
        for (const project of projects){
            if(project.progress==='Completed') continue;
            const parsedStudents = JSON.parse(project.students); // 2D array
            const flatStudents = parsedStudents.flat();
            if (flatStudents.some((student) => student.username === user.username)){
                projText += `\n${++i}. ${project.title}`;
            }
        }
      let emailText;
      if (projText==='') emailText = `Hi ${user.name}, Create you first project soon!`;
      else emailText = `Hi ${user.name}, don't forget to complete your ongoing project!${projText}`;
      await sendReminderEmail(user.username, (projText==='')?'Create Your First Project!':'Project Reminder!', emailText);
    }
  } catch (err) {
    console.error('Error fetching users or sending emails:', err);
  }
});
