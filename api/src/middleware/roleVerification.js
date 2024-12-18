export const roleVerification = (req, res, next) => {
  if (!req?.role) return res.status(401).json("Role requried");
  if (req.role !== "Admin") return res.status(401).json("Not authorized");

  next();
};
