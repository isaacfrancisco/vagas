const data = require("./fakeData");
const UserNotFoundError = require("./errors/user/userNotFoundError");

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

module.exports = {
  updateUserById,
};
