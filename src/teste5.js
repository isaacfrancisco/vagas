const data = require("./fakeData");
const UserNotFoundError = require("./errors/user/userNotFoundError");
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
  countUserReadings,
};
