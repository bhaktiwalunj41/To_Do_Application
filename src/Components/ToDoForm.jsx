import React, { useContext, useReducer, useState } from 'react'
import {ToDoContext} from '../Context/ToDoContext'
import { useNavigate } from 'react-router-dom'

const ToDoForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const {dispatch} = useContext(ToDoContext)

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/')
    try{
      console.log(name, description)
      const payload = {name:name, description:description}
      dispatch({type:'ADD_TODO', payload:{name,description}})
      navigate('/')
    }
    catch(error){
      console.log(error)
    }
    
  }
  return (
   <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h1 className="text-center text-success mb-4">
        <b>To Do Application</b>
      </h1>

      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-body p-4">
          <h3 className="mb-4 text-primary">Create a new ToDo</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Task Name</label>
              <input type="text" className="form-control"  placeholder="e.g., Learn React" onChange={(e) => setName(e.target.value)} required/>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea className="form-control" placeholder="Details about the task" onChange={(e) => setDescription(e.target.value)}required/>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Add Task </button>
           
          </form>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default ToDoForm
