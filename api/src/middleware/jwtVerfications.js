import jwt from "jsonwebtoken";

export const jwtVerification = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader);
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json("Unauthorized");
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = decoded.User.username;
    req.role = decoded.User.role;
    next();
  });
};
