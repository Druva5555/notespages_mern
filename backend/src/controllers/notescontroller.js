import Note from "../models/note.js";

export const getnotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in fetching notes:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getnotesbyid = async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);
     if (!notes) {
       return res.status(404).json({ message: "Note not found!" });
     }
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in fetching notes:", error);
    res.status(500).json({ message: "internal server error" });
  }
};




export const createnotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newnote = new Note({
      title,
      content,
    });
    await newnote.save();
    res.status(201).json({ message: "Note created successfully!" });
  } catch (error) {
    console.error("error in createnote controller:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const updatenotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const x = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!x) {
      return res.status(404).json({ message: "Note not found!" });
    }

    res.status(200).json(x);
  } catch (error) {
    console.error("error in updatenotes controller:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deletenotes = async (req, res) => {
     try{
          const deleted = await Note.findByIdAndDelete(req.params.id);
          if (!deleted) {
               return res.status(404).json({ message: "Note not found!" });
          }
          res.json({ message: "Note deleted successfully!" });
     }catch(error){
          console.error("error in delete note controller:", error);
          res.status(500).json({ message: "internal server error" });
     }
};
