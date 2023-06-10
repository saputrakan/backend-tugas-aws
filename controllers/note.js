const Note = require("../models/Note");

const getNotes = async (req, res) => {
  let notes = await Note.findAll();
  let response = {
    code: 200,
    status: true,
    data: notes,
    message: "success get data",
  };
  return res.status(response.code).json(response);
};

const getNote = async (req, res) => {
    const noteId = req.params.id;
    let note = await Note.findOne({
        where: {
            id:noteId,
        }
    });
    let response = {
      code: 200,
      status: true,
      data: note,
      message: "success get data",
    };
    return res.status(response.code).json(response);
  };

const createNote = async (req, res) => {
  let response = {
    code: 200,
    status: true,
    data: null,
    message: "success create note",
  };
  try {
    let { title, description } = req.body;
    const newNote = await Note.create({ title, description });
    response.data = newNote;
    return res.status(response.code).json(response);
  } catch (error) {
    response.message = "please check the parameter again";
    response.code = 400;
    response.status = false;
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      response.error = errors;
      return res.status(response.code).json(response);
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const deleteNote = await Note.destroy({
    where: {
      id: noteId,
    },
  });
  if (deleteNote === 0) {
    return res.status(404).json({ error: "data note not found" });
  }
  return res.status(200).json({ message: "data note deleted successfully" });
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const {title, description} = req.body;
  try {
    
      const findNote = await Note.findOne({
        where: {
            id: noteId,
        }
      });
      if(!findNote)
            return res.status(400).json({error: "data note not found"});
    
      findNote.title = title;
      findNote.description = description;
      await findNote.save();
    
      return res.status(200).json({message: "success update note", data: findNote});
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({errors});
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
};
