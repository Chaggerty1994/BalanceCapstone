
import React from "react";
import { Timer } from "./Timer/Timer";
import { ToDoList } from "./To-Do/To-Do-List";
import "./home.css"
import { TimerContext } from "./Timer/timerContext";
import { useState } from "react";





export const Home = () => {

    // creating a state variable for work minutes. its initial state will be 20
    const [workMinutes, setWorkMinutes] = useState(0)
    // creating a state variable for rest minutes. its initial value will be 5
    const [restMinutes, setRestMinutes] = useState(0)

 

    return <>
    {/* wrapping the context provider arround my todo list and my timer
    so that i can set the work minutes and rest minutes from either module */}
            <TimerContext.Provider value={{
                workMinutes,
                restMinutes,
                setWorkMinutes,
                setRestMinutes,
              
            }}>
        <div className="listandtimer">
            <div className="list">
                <div className="ToDoListGroup">
                    <ToDoList />
                </div>
            </div>

                <div className="timer">
                   
                    <Timer/>
                </div>
        </div>
            </TimerContext.Provider>


    </>
}