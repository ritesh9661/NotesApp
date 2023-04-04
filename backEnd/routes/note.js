const express = require("express");
const router = express.Router();
const notesController = require("../controller/notesController");

router.post("/create", notesController.create);
router.get("/:id", notesController.get);
// router.get('/all',notesController.all);
router.put("/:id/update", notesController.update);
router.delete("/:id/delete", notesController.delete);
module.exports = router;