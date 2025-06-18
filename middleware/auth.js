import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next();

    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "No token provided" });
};

export default protect;

export const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: "Access denied, Admin only" });
    }
}