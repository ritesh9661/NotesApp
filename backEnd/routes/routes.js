import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNoteById
} from "../controller/notesController.js";

const route = express.Router();

route.get("/", function (req, res) {
  res.send("Welcome to backend");
});

route.post("/notes/create", createNote);
route.get("/notes/get", getNotes);
route.get('/notes/:id', getNoteById);
route.put("/notes/update/:id", updateNote);
route.delete("/notes/delete/:id", deleteNote);

export default route;
