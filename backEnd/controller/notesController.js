import notesSchema from "../models/schema.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title){
      throw new Error('Title field is missing ');
    } else if (!content) {
      throw new Error('Contentis field is missing ');
    } 

    let createNote = await notesSchema.create({
      title,
      content,
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

export const getNotes = async (req, res,next) => {
  try {
    
    const notes = await notesSchema.find({});
    const { title, content, isImportant } = req.params;
    if(title===""){
      throw new Error('Title field is missing ');
    }  
    else if (notes) {
      res.status(200).json({
        success: true,
        message: "Notes fetched !",
        data: notes,
      });
    }else{
      res.status(404).json({
        success: false,
        message: "Note Not found!",
        data: null,
      });
    }
  } catch (error) {
    // res.status(400).json({ message: error.message });
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const noteSchema = await notesSchema.findById(id);
    if (noteSchema) {
      res.status(200).json({
        success: true,
        message: "Note fetched successfully!",
        data: noteSchema,
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
    if (!id) {
      throw new Error('ID Not Found')
    } else if(!title){
      throw new Error('Title field is missing ');
    } else if (!content) {
      throw new Error('Content field is missing ');
    }
    
    
    const noteSchema = await notesSchema.findById(id);
    if (noteSchema) {
      noteSchema.title = title ;
      noteSchema.content = content ;
     const response = await noteSchema.save();

      res.status(200).json({
        success: true,
        message: "Note Updated successfully!",
        data: noteSchema,
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
