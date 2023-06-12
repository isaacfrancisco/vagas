const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const { validateName } = require("../middlewares/validateName");
const { validateJob } = require("../middlewares/validateJob");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", function (req, res) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

router.get("/user", userController.getUserByName);
router.get("/users", userController.getUsers);
router.get("/users/access", userController.countUserReadings);
router.post("/users", validateName, validateJob, userController.createUser);
router.put(
  "/users",
  verifyToken,
  validateName,
  validateJob,
  userController.updateUserById
);
router.delete("/users", verifyToken, userController.deleteUserByName);

module.exports = router;
