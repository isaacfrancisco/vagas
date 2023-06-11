const validateString = (field) => {
  return typeof field === "string" ? true : false;
};

module.exports = {
  validateString,
};
