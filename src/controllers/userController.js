const data = require("../database/fakeData");
const UserNotFoundError = require("../errors/user/userNotFoundError");
const { countReadings } = require("../utils/countReadings");

// --TESTE 1--
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

// --TESTE 2--
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

// --TESTE 3--
// module.exports = function(req, res) {

//     var name =  req.query.name;

//     for(let i = 0; i < data.length;  i++) {
//         if(i.name == name) {
//             data[i] = null;
//         }
//     }

//     res.send("success");

// };

const deleteUserByName = (req, res) => {
  try {
    const name = req.query.name;

    const user = data.find((user) => user.name === name);
    if (!user) throw new UserNotFoundError("Usuário não encontrado", 404);

    const indexToRemove = data.indexOf(user);
    data.splice(indexToRemove, 1);

    return res.send("Sucesso!");
  } catch (error) {
    res.status(error.status ?? 500).json(error.message);
  }
};

// --TESTE 4--
// module.exports =  function(req, res) {

//     var id =  req.query.id;

//     const reg = data.find(d => id == id);
//     reg.name = req.body.name;
//     reg.job = req.body.job;

//     res.send(reg);

// };

const updateUserById = (req, res) => {
  try {
    const id = Number(req.query.id);
    const name = req.body.name;
    const job = req.body.job;

    const user = data.find((user) => user.id === id);
    if (!user) throw new UserNotFoundError("Usuário não encontrado", 404);

    const userUpdated = { id, name, job, count: 0 };
    const index = data.findIndex((user) => user.id === userUpdated.id);

    data[index] = userUpdated;

    return res.send({
      id: userUpdated.id,
      name: userUpdated.name,
      job: userUpdated.job,
    });
  } catch (error) {
    res.status(error.status ?? 500).json(error.message);
  }
};

// module.exports = function(req, res){

//     var name =  req.query.name;

//     res.send("Usuário " +  name  + "  foi lido 0 vezes.");

// };

const countUserReadings = (req, res) => {
  const name = req.query.name;

  const user = data.find((user) => user.name === name);
  if (!user) throw new UserNotFoundError("Usuário não encontrado", 404);

  return res.send(
    `Usuário "${user.name}" foi lido ${
      user.hasOwnProperty("count") ? user.count : 0
    } vezes.`
  );
};

module.exports = {
  getUserByName,
  getUsers,
  createUser,
  deleteUserByName,
  updateUserById,
  countUserReadings,
};
