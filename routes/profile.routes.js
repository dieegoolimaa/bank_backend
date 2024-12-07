const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const express = require("express");
const router = express.Router();

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

    // Verify if there is an existing profile
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already created" });
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
router.get("/:userId", isAuthenticated, async (req, res) => {
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
