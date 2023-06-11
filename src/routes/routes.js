const express = require("express");
const router = express.Router();

const teste1 = require("../teste1");
const teste2 = require("../teste2");
const teste3 = require("../teste3");
const teste4 = require("../teste4");
const teste5 = require("../teste5");
const { validateName } = require("../middlewares/validateName");
const { validateJob } = require("../middlewares/validateJob");

router.get("/", function (req, res) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

router.get("/user", teste1.getUserByName);
router.get("/users", teste1.getUsers);
router.get("/users/access", teste5);
router.post("/users", validateName, validateJob, teste2.createUser);
router.put("/users", teste4);
router.delete("/users", teste3.deleteUserByName);

module.exports = router;
