
const express = require("express");
const { getUsers, postUsers, getUser, putUser, deleteUser, askToSendVerification } = require("../controllers/users");
const router = express.Router();

router.route("/users").get(getUsers).post(postUsers)
router.route("/users/:id").get(getUser).put(putUser).delete(deleteUser)

module.exports = router;
