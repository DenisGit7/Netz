import { LastUpload } from "../../models/LastUpload.js";

export const deleteUploadController = async (req, res) => {
  const id = req?.params?.id;
  if (!id) return res.status(400).json({ message: "Id is required." });
  const oneLastUpload = await LastUpload.findOne({ _id: id });

  if (!oneLastUpload) {
    return res.status(400).json({ message: "LastUpload not found" });
  }
  try {
    const result = await oneLastUpload.deleteOne();

    res.status(201).json({ message: "LastUpload deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
