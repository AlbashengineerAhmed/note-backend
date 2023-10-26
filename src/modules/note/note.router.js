import {Router} from 'express'
import * as noteController from  './controller/note.js'
import auth from '../../middleware/auth.js';
const router = Router();


router.get("/" , auth, noteController.getNoteModule)
router.get('/allNote', auth, noteController.getNotesForUser);
router.get("/:id" , auth, noteController.getNoteById)
router.post("/" , auth , noteController.addNoteModule)
router.put("/:id" , auth , noteController.updateNoteModule)
router.delete("/:id" , auth , noteController.deleteNoteModule)

export default  router