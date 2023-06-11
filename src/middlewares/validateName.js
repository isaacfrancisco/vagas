const { validateEmpty } = require("../utils/validation/validateEmpty");
const { validateString } = require("../utils/validation/validateString");

const validateName = (req, res, next) => {
  const name = req.body.name;

  if (!validateEmpty(name)) {
    return res
      .status(400)
      .json({ error: "Campo name é obrigatório e não pode estar vazio" });
  }

  if (!validateString(name)) {
    return res.status(400).json({ error: "Campo name precisa ser string" });
  }

  next();
};

module.exports = {
  validateName,
};
