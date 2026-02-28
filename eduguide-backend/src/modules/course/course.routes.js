const express = require("express");
const {
    create,
    getAll,
    getById,
    update,
    deletecourse,

} = require("./course.controller");

const { authenticateToken } = require("../../middleware/auth.middleware");
const { authorizedRoles } = require("../../middleware/role.middleware");

const router = express.Router();

router.post("/", authenticateToken, authorizedRoles("instructor"), create);

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);

router.put("/:id", authenticateToken, authorizedRoles("instructor"), update);

router.delete("/:id", authenticateToken, authorizedRoles("instructor"), deletecourse);



module.exports = router;