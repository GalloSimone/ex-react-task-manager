import { useState,useRef } from "react"
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask(){
    const [name,setName]=useState('')
    const [error,setError]=useState('')

    const descriptionRef=useRef();

    const[status,setStatus]=useState("to do");

    const handleNameChange=(e)=>{ 
    const newName = e.target.value;
        setName(newName)
    
    if (symbols.split('').some(symbol=>newName.includes((symbol)))) {
        setError("il nome non puo contenere simboli speciali")
        
    }
    else if (newName.trim().split(/\s+/).length<3) {
        setError("il nome deve contenere almeno 3 parole")
    }
    else{setError('')}
}

const handleStatusChange=(e)=>{
    setStatus(e.target.value);
}

const handleSubmit=(e)=>{e.preventDefault();
    const description=descriptionRef.current.value;
    console.log({
        title: name,
        description: description,
        status: status
    });
    
}
    return(
     <>
     <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
      <input 
      type="text" 
      className="form-control"
      placeholder="nome task"
      value={name}
      onChange={handleNameChange}
       />
       {error && <p style={{color:'red'}}>{error}</p>}

       <textarea 
       ref={descriptionRef}
      placeholder="descrizione"
      className="form-control"
       />

       <select 
       value={status}
       onChange={handleStatusChange}
       name="status" 
       className="form-select"
       >
      <option value="To do">To do</option>
      <option value="Doing">Doing</option>
      <option value="Done">Done</option>
     
       </select>
       <button type="submit" className="btn btn-primary">aggiungi task</button>
       </div>
     </form>
     </>   
    )
}