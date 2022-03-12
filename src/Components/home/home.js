
import React from "react";
import { Timer } from "./Timer/Timer";
import { ToDo } from "./To-Do/To-Do";
import { ToDoList } from "./To-Do/To-Do-List";
import "./home.css"
import { TimerContext } from "./Timer/timerContext";

import { useState, useEffect } from "react";




export const Home = () => {

    // creating a state variable for work minutes. its initial state will be 20
    const [workMinutes, setWorkMinutes] = useState(20)
    // creating a state variable for rest minutes. its initial value will be 5
    const [restMinutes, setRestMinutes] = useState(5)

    // const [timers, setTimers] = useState([])

    // useEffect(
    //     () => {
    //         fetch("http://localhost:8088/timers")
    //             .then(res => res.json())
    //             .then((timerArray) => {
    //                 setTimers(timerArray)
    //             })
    //     },
    //     []
    // )

    // useEffect(
    //     () => {
    //         const justAlengths = timers.map(t => t.aLength)

    //         setWorkMinutes(justAlengths)
    //     }
    // )
    return <>
            <TimerContext.Provider value={{
                workMinutes,
                restMinutes,
                setWorkMinutes,
                setRestMinutes
            }}>
        <div className="listandtimer">
            <div className="list">
                {/* <h3>To-Do-List</h3> */}
                <div className="ToDoListGroup">
                    <ToDoList />
                </div>
            </div>

            {/* assigning my state variables and setter functions 
            to the value of timerContext so that i can use them in my
            other modules */}
                <div className="timer">
                    {/* <h3>Focus Timer</h3> */}
                    <Timer />
                </div>
        </div>
            </TimerContext.Provider>


    </>
}