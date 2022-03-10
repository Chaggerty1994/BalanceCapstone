
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



export const ToDoList = () => {

    const [tasks, addTask] = useState([])

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


    

    return (
        <>

            {
                tasks.map(
                    (task) => {
                        return <ul>
                            <li key={`task--${task.id}`}>
                                {task.description}

                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="name">Done</label>
                                        <input
                                            onChange={
                                                (evt) => {
                                                    const copy = { ...task }
                                                    copy.active = evt.target.checked
                                                    changeTask(copy)
                                                }
                                            }
                                            type="checkbox" />
                                    </div>
                                </fieldset>

                                <button onClick={() => {
                                    deleteTask(task.id)
                                }}>Delete</button>

                            </li>

                        </ul>
                    }
                )
            }


        </>
    )
}