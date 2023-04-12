import notesSchema from "../models/schema.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content, isImportant } = req.body;

    let createNote = await notesSchema.create({
      title,
      content,
      isImportant,
    });
    if (createNote) {
      res.status(200).json({
        success: true,
        message: "Created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await notesSchema.find({});
    if (notes) {
      res.status(200).json({
        success: true,
        message: "Notes fetched !",
        data: notes,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await notesSchema.findById(id);
    if (note) {
      res.status(200).json({
        success: true,
        message: "Note fetched successfully!",
        data: note,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note Not found!",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await notesSchema.findById(id);
    if (note) {
      note.title = title || note.title;
      note.content = content || note.content;
      await note.save();
      res.status(200).json({
        success: true,
        message: "Note Updated successfully!",
        data: note,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await notesSchema.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Note Deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
