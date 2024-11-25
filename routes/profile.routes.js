import { isAuthenticated } from "../middlewares/route-guard.middleware.js";
import Profile from "../models/Profile.model.js";
import User from "../models/User.model.js";
const router = express.Router();

{
  /* const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Profile", profileSchema); */
}

// Profile creation
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const {
      userId,
      name,
      surname,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
    } = req.body;

    // Verify if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new profile
    const profile = new Profile({
      userId,
      name,
      surname,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
    });
    await profile.save();

    res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Profile update
router.put("/", isAuthenticated, async (req, res) => {
  try {
    const {
      userId,
      name,
      surname,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
    } = req.body;

    // Verify if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the profile
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.name = name;
    profile.surname = surname;
    profile.email = email;
    profile.phone = phone;
    profile.address = address;
    profile.city = city;
    profile.country = country;
    profile.postalCode = postalCode;
    await profile.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get profile by user ID
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
