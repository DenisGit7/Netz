import { LastUpload } from "../../models/LastUpload.js";

export const getUploadsController = async (req, res) => {
  try {
    const uploads = await LastUpload.find();
    uploads.sort().reverse();

    res.status(201).json({ uploads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add delete user from list
// Add delete user from list
// Add delete user from list
// Add delete user from list
// Add delete user from list
// Add delete user from list
// Add delete user from list
