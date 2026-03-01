import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.headers.token; // or authorization header

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login (Token Missing)",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ store in req.user (best practice)
    req.user = { userId: decoded.id };

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
