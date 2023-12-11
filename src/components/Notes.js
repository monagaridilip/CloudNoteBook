import React, { useContext, useEffect, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getAllNotes,updateNote } = context;
    const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
    const {showAlert} =props;
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes()
        }
        else{
            history("/login")
        }
        // eslint-disable-next-line
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(note)
        updateNote(note.id,note.etitle, note.edescription, note.etag)
        ref.current.click();
        props.showAlert("Updated successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const editNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
        <AddNotes showAlert={showAlert}/>
            <div>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>update Notes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className="row text-center ">
                <h2>Your Added Notes</h2>
                <div className="">
                    {notes.length === 0 && 'Notes are Empty please add notes!'}   
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} editNote={editNote} note={note} showAlert={showAlert}/>
                })}
            </div>

        </>
    )
}

export default Notes
