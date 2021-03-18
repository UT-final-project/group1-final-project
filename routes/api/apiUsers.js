const router = require("express").Router();
const userController = require("../../controller/userController");

// User signup post route
router.route("/")
    .post(userController.create);

module.exports = router;