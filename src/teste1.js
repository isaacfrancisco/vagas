const data = require("./fakeData");
const UserNotFoundError = require("./errors/user/userNotFoundError");
const { countReadings } = require("./utils/countReadings");

// método corrigido
// const getUser = (req, res, next) => {
//   var name = req.query.name;

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].name == name) {
//       return res.send(data[i]);
//     }
//   }
// };

//Minha solução para o método melhorado
const getUserByName = (req, res) => {
  try {
    const name = req.query.name;

    const user = data.find((user) => user.name === name);
    if (!user) throw new UserNotFoundError("Usuário não encontrado", 404);

    const result = countReadings(data, user);

    return res.send({ id: result.id, name: result.name, job: result.job });
  } catch (error) {
    res.status(error.status ?? 500).json(error.message);
  }
};

const getUsers = (req, res, next) => {
  res.send(
    data.map((user) => {
      return { id: user.id, name: user.name, job: user.job };
    })
  );
};

module.exports = {
  getUserByName,
  getUsers,
};
