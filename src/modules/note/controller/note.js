import noteModel from "../../../../DB/model/Note.model.js";

export const getNoteModule = async(req, res, next) => {
    const notes = await noteModel.find().populate({
        path:"userId",
        select:"userName"
    })
  return res.json({ message: "Done", notes });
};

export const getNotesForUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const notes = await noteModel.find({ userId });

    return res.json({ message: 'Done', notes });
  } catch (error) {
    return res.json({ message: 'Error', error });
  }
};

export const getNoteById = async(req, res, next) => {
  const note = await noteModel.findById(req.params.id).populate({
      path:"userId",
      select:"userName"
  })
return res.json({ message: "Done", note });
};

export const addNoteModule = async(req, res, next) => {
  try {
    const { title, description} = req.body;
    console.log({ title, description});

    const note = await noteModel.create({ title, description, userId : req.user._id })
    return res.json({message:"Done", note});
  } catch (error) {
    return res.json({message:"catch error", error});
  }
};

export const updateNoteModule = async(req, res, next) => {
  try {
    const {id} = req.params
    const { title, description} = req.body;

    const note = await noteModel.findOneAndUpdate(
      {_id:id, userId:req.user._id},
      { title, description},
      {new:true}
      )
    return note? res.json({message:"Done", note}) : res.json({message:"not auth user"});
  } catch (error) {
    return res.json({message:"catch error", error});
  }
};

export const deleteNoteModule = async(req, res, next) => {
  try {
    const {id} = req.params
    const note = await noteModel.findOneAndDelete({_id:id, userId:req.user._id})
      return note? res.json({message:"Done", note}) : res.json({message:"not auth user"});
  } catch (error) {
    return res.json({message:"catch error", error});
  }
};
