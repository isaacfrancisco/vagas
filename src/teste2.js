const UserAlreadyExistsError = require("./errors/user/userAlreadyExistsError");
const data = require("./fakeData");

// Metodo corrigido
// module.exports = function (req, res) {
//   const name = req.body.name;
//   const job = req.body.job;
//   const newId = data[data.length - 1].id + 1;

//   const newUser = {
//     id: newId,
//     name: name,
//     job: job,
//   };

//   data.push(newUser);

//   res.send(newUser);
// };

//Minha solução para o método melhorado
const createUser = (req, res) => {
  try {
    const name = req.body.name;

    const alreadyExists = data.find((user) => user.name === name);
    if (alreadyExists)
      throw new UserAlreadyExistsError(
        `Já existe um usuário com o nome ${name}`,
        400
      );

    const job = req.body.job;
    const newId = data[data.length - 1].id + 1;

    const newUser = {
      id: newId,
      name: name,
      job: job,
    };

    data.push(newUser);

    return res.send(newUser);
  } catch (error) {
    res.status(error.status ?? 500).json(error.message);
  }
};

module.exports = {
  createUser,
};
