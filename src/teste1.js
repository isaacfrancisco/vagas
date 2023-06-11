var data = require("./fakeData");
const UserNotFoundError = require("./errors/user/userNotFoundError");

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
const getUser = (req, res) => {
  try {
    const name = req.query.name;

    const user = data.find((user) => user.name === name);
    if (!user) throw new UserNotFoundError("Usuário não encontrado", 404);

    return res.send(user);
  } catch (error) {
    res.status(error.status ?? 500).json(error.message);
  }
};

const getUsers = (req, res, next) => {
  res.send(data);
};

module.exports = {
  getUser,
  getUsers,
};
