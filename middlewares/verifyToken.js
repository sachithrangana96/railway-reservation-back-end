const jwt =require("jsonwebtoken");


exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // return next(createError(401, "You are not authenticated!"));
    res.status(404).json({ error: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return  res.status(404).json({ error: "Token is not valid!" });
    req.userId = user.id;
    return  next();
  });
};