const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ mensagem: "É necessário inserir o token no header!" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ mensagem: "Token inválido." });
  }
};

module.exports = {
  verifyToken,
};
