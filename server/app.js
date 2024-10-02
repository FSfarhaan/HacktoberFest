const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import CORS

const fetchNodeID = require("./helpers/fetchNodeID");
const { fetchPRHistory, transformPRs } = require("./helpers/hacktoberfest");

dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(
    // "mongodb+srv://varad:varad6862@cluster0.0suvvd6.mongodb.net/hactoberfest",
    "mongodb://localhost:27017/CSI",
    {
      // Use environment variable for the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  prNumber: { type: Number },
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  const { username, password, token } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash the password before saving

  const newUser = new User({ username, password: password, token });

  try {
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error signing up: " + error.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password != password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ token: user.token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
});

// Route to upload PR number
app.post("/pr", async (req, res) => {
  const { username, prNumber } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.prNumber = prNumber; // Update PR number
    await user.save();

    res.status(200).json({ message: "PR number uploaded successfully!" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error uploading PR number: " + error.message });
  }
});

// Route to handle Hacktoberfest data
app.post("/hacktoberfest", async (req, res) => {
  const userToken = req.body.token;

  try {
    const userNodeID = await fetchNodeID(userToken);
    const PRHistory = await fetchPRHistory(userNodeID, userToken);
    const transformedPRs = transformPRs(PRHistory);

    console.log("PR History:", PRHistory[5].labels.edges);
    console.log("Transformed PRs Size:", transformedPRs.size);

    //  sending size
    res.json({ pr: transformedPRs.size });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Hacktoberfest data: " + error.message });
  }
});

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Magic lies underneath!");
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
