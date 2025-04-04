const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GOOGLE_SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxY2bfPfk9iEI0CmtgpiQP6W83h_FrVmCNISXM6VDqwV7l6Cb1A_06W1Dah2ay4kZd3/exec";

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

app.post("/signup", async (req, res) => {
  try {
    const hashed = await hashPassword(req.body.password);
    const obj = { ...req.body, password: hashed };
    const response = await axios.post(GOOGLE_SHEET_WEBHOOK_URL, obj);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

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

app.listen(4000, () => console.log("Server running on port 4000"));
