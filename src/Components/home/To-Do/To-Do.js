
import { Button, InputLabel, Paper, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import "./To-Do.css"

// !!!! when i set a new task it is added to the list. but the text
// in the form doesnt dissapear !!!!!!

export const ToDo = ({ addTask }) => {

    // creating the initial state for a new task form entry
    const [task, newTask] = useState({

        userId: 1,
        description: "",
        active: true,
        timerId: 0

    })

    // creating the initial state for a timer as an empty array then 
    // defining a function that will set my selection to that array
    const [timers, setTimer] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/timers")
                .then(res => res.json())
                .then((timerArray) => {
                    setTimer(timerArray)
                })
        },
        []
    )




    const history = useHistory()


    const addNewTask = (evt) => {


        evt.preventDefault()


        const newTask = {

            userId: parseInt(localStorage.getItem("balance_user")),
            description: task.description,
            active: task.active,
            timerId: parseInt(task.timerId)
        }


        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }


        return fetch("http://localhost:8088/tasks", fetchOption)
            .then(() => { return fetch("http://localhost:8088/tasks?_expand=timer") })
            .then(res => res.json())
            .then((tasksFromAPI) => {
                addTask(tasksFromAPI)
            })
            .then(() => {
                const newTaskInput = document.querySelector("#newTaskInput")
                const newTaskSelect = document.querySelector("#newTaskSelect")
                newTaskInput.value = ""
                newTaskSelect.value = ""

            })


    }


    return (

        <Paper className="taskform" elevation={12} style={{ margin: "0px 0px 8px 0px", border: "2px solid purple" }} >
            <form>

                <fieldset className="taskForm">
                    <div className="textandtimerselect">
                        <div className="form-group">

                            <input
                                onChange={
                                    (evt) => {
                                        const copy = { ...task }
                                        copy.description = evt.target.value
                                        newTask(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                id="newTaskInput"
                                className="form-control"
                                placeholder="new task"
                            />

                            <select

                                onChange={
                                    (evt) => {
                                        const copy = { ...task }
                                        copy.timerId = evt.target.value
                                        newTask(copy)
                                    }
                                }

                                label="Pick a Timer"
                                required autoFocus
                                id="newTaskSelect"
                                type="select"
                                className="form-control"
                                placeholder="timer"
                            >
                                <option value="0" key={`location--`}>Pick a Timer</option>
                                {
                                    timers.map(
                                        (timerObject) => {
                                            return <option value={timerObject.id} key={`timer--${timerObject.id}`}>{timerObject.aLength} : {timerObject.bLength}</option>
                                        }

                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <Button onClick={addNewTask} className="btn btn-primary">
                        Set Task
                    </Button>
                </fieldset>

            </form>
        </Paper>
    )
}