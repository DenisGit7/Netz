import { LastUpload } from "../../models/LastUpload.js";
export const createUploadController = async (user, fullpath) => {
  try {
    await LastUpload.create({ username: user, fullpath: fullpath });
  } catch (err) {}
};
