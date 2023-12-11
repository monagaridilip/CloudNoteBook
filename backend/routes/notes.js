const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route:2 add notes using: POST "http://localhost:5000/api/notes/addnotes"  Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 4 }),
    body('description', 'Enter any vallid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.msg)
        res.status(500).send("Internal server error!")
    }

})
//Route:3 Update Notes using: PUT "http://localhost:5000/api/notes/update/:id"  Login required
router.put('/update/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a newNote
        let newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //Find the note to be updated and update the node
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not avaliable")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not avaliable")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.error(error.msg)
        res.status(500).send("Internal server error!")
    }
})
//Route:4 Delete notes using: PUT "http://localhost:5000/api/notes/delete/:id"  Login required
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be updated and update the node
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not avaliable")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not avaliable")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note is successfully deleted", note })
    }
    catch (error) {
        console.error(error.msg)
        res.status(500).send("Internal server error!")
    }
})

module.exports = router;