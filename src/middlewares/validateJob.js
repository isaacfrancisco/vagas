const { validateEmpty } = require("../utils/validation/validateEmpty");
const { validateString } = require("../utils/validation/validateString");

const validateJob = (req, res, next) => {
  const job = req.body.job;

  if (!validateEmpty(job)) {
    return res
      .status(400)
      .json({ error: "Campo job é obrigatório e não pode estar vazio" });
  }

  if (!validateString(job)) {
    return res.status(400).json({ error: "Campo job precisa ser string" });
  }

  next();
};

module.exports = {
  validateJob,
};
