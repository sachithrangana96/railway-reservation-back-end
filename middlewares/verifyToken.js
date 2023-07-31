const jwt =require("jsonwebtoken");


exports.verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (!token) {
    // return next(createError(401, "You are not authenticated!"));
   return res.status(401).json({ error: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return  res.status(401).json({ error: "Token is not valid!" });
    req.userId = user.id;
    return  next();
  });
};