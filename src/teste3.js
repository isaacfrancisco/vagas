const data = require("./fakeData");
const UserNotFoundError = require("./errors/user/userNotFoundError");

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

module.exports = {
  deleteUserByName,
};
