
import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const InitialNotes = []
  const [notes, setNotes] = useState(InitialNotes)

  //Fetch notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json();

    setNotes(json)

  }

  //Add Note
  const addNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ id, title, description, tag }),
    })
    const note = await response.json();
    // console.log(note)
    // console.log("Adding New Node")
  
    setNotes(notes.concat(note))
  }

  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json();
    setNotes(json)
    
    // console.log("Deleting the notes with " + id)
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Update Note

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    // eslint-disable-next-line no-unused-vars
    const json = await response.json() 
    
    // console.log(json)
    const newNotes = await JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
    
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;