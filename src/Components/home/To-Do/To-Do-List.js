

import { Box, Button, Checkbox, IconButton, Menu, MenuItem, Paper, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToDo } from "./To-Do";
import "./To-Do.css"
import { TimerContext } from "../Timer/timerContext";
import { ListMenu } from "./listMenu";
import { pink } from "@mui/material/colors";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


export const ToDoList = () => {

    // creating a state variable to hold all of the different timers from my API
    const [timers, setTimers] = useState([])
    const userId = localStorage.getItem("balance_user")
    const [currentUser, setCurrentUser] = useState(0)


    useEffect(
        () => {
            setCurrentUser(userId)
        }, []
    )
    useEffect(
        () => {
            fetch("https://balance-api-drdtl.ondigitalocean.app/timers")
                .then(res => res.json())
                .then((timerArray) => {
                    setTimers(timerArray)
                })
        },
        []
    )

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
        fetch("https://balance-api-drdtl.ondigitalocean.app/tasks?_expand=timer&_expand=user")
            .then(res => res.json())
            .then((tasksFromAPI) => {
                addTask(tasksFromAPI)
            })
    }



    const changeTask = (taskObject) => {
        fetch(`https://balance-api-drdtl.ondigitalocean.app/tasks/${taskObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObject)
        })
            .then(res => res.json())
            .then(fetchTasks)
    }

    
   

    const [userTeamId, setUserTeamId] = useState(0)


    // this use effect is fetching the teamMembers array from the database
    // with the user information expanded on it. its then taking that array
    // and finding the object in the array with the userId that is identical
    // to the current user thats logged in. its then finding the teamId of that user
    // then setting the userTeamId state variable to that Id to be compared 
    // to the other users later. it is watching for the current user state to change
    useEffect(
        () => {
            fetch("https://balance-api-drdtl.ondigitalocean.app/teamMembers?_expand=user")
                .then(res => res.json())
                .then((membersArray) => {
                    const teamMember = membersArray.find(
                        member => member.userId === parseInt(currentUser))
                        console.log(teamMember)
                    
                    const userTeamId = teamMember.user.teamId
                    setUserTeamId(userTeamId)
                })
        }, [currentUser]
    )


    

  

    const { workMinutes,
        restMinutes,
        setWorkMinutes,
        setRestMinutes } = useContext(TimerContext)



    return (
        <>
       
          <Paper style={{minHeight: 300, maxHeight: 300, overflow: 'auto', backgroundColor: ''}} className="tasklistscroll">
            
           
            {
               
                tasks.map(
                    (task) => {
                        if ((task.team === true && task.teamId === userTeamId) 
                             || task.userId === parseInt(currentUser)) {
                            
                            return( 
                            
                            <Paper

                                className="listItem"
                                elevation={12}
                                style={{
                                    margin: "0px 0px 8px 0px",
                                    border: task.team === false ? ("2px solid purple") : ("2px solid #3e98c9") 
                                }}>
                                   
                                            
                                <li key={`task--${task.id}`} className="list-item">
                                    {/* if the current selected task has be chosen to edit
                        then render a input text box. */}
                                    <div className="checkbox">

                                        <Checkbox
                                            onChange={
                                                (evt) => {
                                                    const copy = { ...task }
                                                    copy.active = !evt.target.checked
                                                    delete copy.timer
                                                    changeTask(copy)
                                                }
                                            }
                                            type="checkbox" />
                                    </div>
                                    <div className="tasktext">
                                        {taskEditing === task.id ? (
                                            <input
                                                type="text"
                                                onChange=
                                                {(evt) => setEditingTask(evt.target.value)}
                                                value={editingTask} />) : (task.description)}

                                    </div>
                                    <fieldset className="taskbuttons">


                                        <div>
                                            <ListMenu className="listMenu"
                                                editingTask={editingTask}
                                                changeTask={changeTask}
                                                fetchTasks={fetchTasks}
                                                taskEditing={taskEditing}
                                                setTaskEditing={setTaskEditing}
                                                setWorkMinutes={setWorkMinutes}
                                                setRestMinutes={setRestMinutes}
                                                task={task}
                                                setEditingTask={setEditingTask} />
                                        </div>


                                    </fieldset>
                                </li>
                                
                              
                            </Paper>
                            )
                        }

                    }
                )
            }
            
            </Paper>
            

            <ToDo addTask={addTask} />
        </>
        
    )
    
}