import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const atoken = req.headers.atoken;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login (Token Missing)",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    const adminKey = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

    if (token_decode !== adminKey) {
      return res.json({
        success: false,
        message: "Not Authorized Login (Invalid Token)",
      });
    }

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
