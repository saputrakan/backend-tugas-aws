require('express-group-routes');
const { Route } = require("express");
const app =  require("express");
const {getNotes, createNote, deleteNote, updateNote, getNote} = require("../controllers/note") 
const router = app.Router();

router.get("/note", getNotes)
      .get("/note/:id", getNote)
      .post("/note", createNote)
      .put("/note/:id", updateNote)
      .delete("/note/:id", deleteNote);

module.exports = router;