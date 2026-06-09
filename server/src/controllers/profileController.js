const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/profile.json");

const readProfile = () => {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
};

const writeProfile = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
};

const getProfile = (req, res) => {
  try {
    const profile = readProfile();
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to read profile data." });
  }
};

const updateProfile = (req, res) => {
  try {
    const existing = readProfile();
    const updated = {
      ...existing,
      ...req.body,
      social: {
        ...existing.social,
        ...(req.body.social || {}),
      },
    };
    writeProfile(updated);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update profile data." });
  }
};

module.exports = { getProfile, updateProfile };
