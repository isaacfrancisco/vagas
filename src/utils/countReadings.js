const countReadings = (data, userFound) => {
  const index = data.findIndex((user) => user.id === userFound.id);

  data[index] = {
    ...userFound,
    count: userFound.hasOwnProperty("count") ? userFound.count + 1 : 1,
  };
  return data[index];
};

module.exports = {
  countReadings,
};
