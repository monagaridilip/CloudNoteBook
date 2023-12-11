import React,{useContext}from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note,editNote } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context;
    return (
        <div className='col-4 col-xl-3 col-lg-3 col-md-4 col-sm-6 my-2'>
            <div className="card " >
                <div className="card-body d-flex align-items-center  justify-content-around">
                    <div>
                        <h5 className="card-title">{note.title}</h5>
                    </div>
                    <div>
                        <i className="fa-solid fa-trash mx-2 fa-lg" onClick={()=>{ deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 fa-lg" onClick={()=>{return editNote(note)}}></i>
                    </div>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
      
    )
}

export default Noteitem
