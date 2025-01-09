const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authhearder = req.headers["authorization"];
  console.log(authhearder);
  const token = authhearder && authhearder.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      succss: false,
      message: "Access denied,No token provided, Please login to continue",
    });
  }

  //decode the token
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedTokenInfo);
    req.userInfo = decodedTokenInfo;
    next();
  } catch (error) {
    return res.status(500).json({
      succss: false,
      message: "Access denied,No token provided, Please login to continue",
    });
  }
};

module.exports = authMiddleware;
