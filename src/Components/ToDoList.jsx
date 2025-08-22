import React, { useContext, useState } from "react";
import { ToDoContext } from '../Context/ToDoContext';

const ToDoList = () => {
  const { state, dispatch } = useContext(ToDoContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState({});

// Function to filter todos by search
const filterBySearch = (todo, search) => {
  return (
    todo.name.toLowerCase().includes(search.toLowerCase()) ||
    todo.description.toLowerCase().includes(search.toLowerCase())
  );
};

// Function to filter todos by status
const filterByStatus = (todo, filter) => {
  if (filter === "complete") return todo.isComplete;
  if (filter === "incomplete") return !todo.isComplete;
  return true; // "all"
};

// Combine both filters
const filteredToDos = state.todos.filter(
  (todo) => filterBySearch(todo, search) && filterByStatus(todo, filter)
);

//Toggle read more or less
const toggleReadMore = (id) =>{
  setExpanded((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};

  return (
    
    <div style={{ padding: "20px" }}>
      <div style={{display: "flex" }}>
      <input type="text"
      placeholder="Search Tasks..."
      onChange={(e) => setSearch(e.target.value)}
      className="form-control mb-3"
      />
       
      {/* Dropdown filter */}
      <select
        className="form-select mb-3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
      
        <option value="all">All Tasks</option>
        <option value="complete">Completed Tasks</option>
        <option value="incomplete">Incomplete Tasks</option>
     

      </select>
      </div>
      
     
      <h2>All Tasks</h2>
      {filteredToDos.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <div className="row">
          {filteredToDos.map((todo) => {
            const isExpanded = expanded[todo.id];
            const shortText = 
                todo.description.length > 50
                ? todo.description.substring(0,50) + "..." : todo.description;
          
          return(
            <div  key={todo.id} className="col-sm-12 col-md-6 col-lg-3 ">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{todo.name}</strong></h5>

                  <p className="card-text">{ isExpanded ? todo.description: shortText}</p>

                  {todo.description.length > 50 && (
                    <button className="btn btn-link p-0"
                    onClick={() => toggleReadMore(todo.id)}>
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}

                  <span style={{ marginLeft: "10px" }}>
                    {todo.isComplete ? "✅" : "❌"}
                  </span>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                    }
                    className="btn btn-warning"
                  >
                    Toggle
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      dispatch({ type: "DELETE_TODO", payload: todo.id })
                    }
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ToDoList;