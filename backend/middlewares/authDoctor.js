import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken;

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login (Token Missing)",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // store doctor id in request
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
