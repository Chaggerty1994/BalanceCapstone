

import { Button, Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToDo } from "./To-Do";
import "./To-Do.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ToDoList = () => {

    const [tasks, addTask] = useState([])

    // declaring a state variable for the specific id of the task that you are 
    // editing when you click to edit button on the task list. its initial
    // value is set to null because it wont be anything until
    // you select one to edit.
    const [taskEditing, setTaskEditing] = useState(null)

    //declaring a state variable for the new text that will be replacing
    // the old text in the todo list. its initial value
    // is an empty string.
    const [editingTask, setEditingTask] = useState("")

    const history = useHistory()


    useEffect(
        () => {
            fetchTasks()
        },
        []
    )

    const fetchTasks = () => {
        fetch("http://localhost:8088/tasks")
            .then(res => res.json())
            .then((tasksFromAPI) => {
                addTask(tasksFromAPI)
            })
    }

    const deleteTask = (id) => {
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(fetchTasks)



    }

    const changeTask = (taskObject) => {
        fetch(`http://localhost:8088/tasks/${taskObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObject)
        })
            .then(res => res.json())
            .then(fetchTasks)
    }

    const editTask = (id) => {

        const updatedTasks = [...tasks].map(
            (task) => {
                if (task.id === id) {
                    task.description = editingTask
                }
                return task
            })
        addTask(updatedTasks)
        setTaskEditing(null)
        setEditingTask("")
    }


    return (
        <>

            {
                tasks.map(
                    (task) => {
                        return <li key={`task--${task.id}`} className="list-item">
                            {/* if the current selected task has be chosen to edit
                        then render a input text box. */}
                            {taskEditing === task.id ? (
                                <input
                                    type="text"
                                    onChange=
                                    {(evt) => setEditingTask(evt.target.value)}
                                    value={editingTask} />) : (task.description)}


                            <fieldset className="taskbuttons">
                                <div className="form-group">
                                   
                                    <Checkbox
                                        onChange={
                                            (evt) => {
                                                const copy = { ...task }
                                                copy.active = evt.target.checked
                                                changeTask(copy)
                                            }
                                        }
                                        type="checkbox" />
                                </div>
                          
                            {/* creating a button with an onClick whose value is an arrow function.
                                // that function is invoking the setTaskEditing function and accepting
                                the selcted task id as an argument */}

                            {taskEditing === task.id ? (<Button onClick={
                                () => {
                                    editTask(task.id)
                                }
                            }>Submit Edit</Button>) : (<IconButton className="button-edit"
                                onClick={() => setTaskEditing(task.id)}>
                                <EditIcon />                           </IconButton>
                            )}
                          

                            <IconButton onClick={() => {
                                deleteTask(task.id)
                            }}><DeleteIcon /></IconButton>
                              </fieldset>
                        </li>


                    }
                )
            }

            <ToDo addTask={addTask} />
        </>
    )
}