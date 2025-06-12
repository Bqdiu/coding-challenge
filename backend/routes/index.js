const express = require("express");
const { createNewAccessCode, validateAccessCode, createEmployee, getAllEmployees, getEmployee, deleteEmployee } = require("../controllers/UserController");
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({message: "Hello"});
})

router.post("/create-new-access-code", createNewAccessCode);
router.post("/validate-access-code", validateAccessCode);
router.post("/create-employee", createEmployee);
router.get("/get-all-employees", getAllEmployees);
router.get("/get-employee/:id", getEmployee);
router.delete("/delete-employee/:id", deleteEmployee);

module.exports = router;
