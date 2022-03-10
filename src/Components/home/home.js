
import React from "react";
import { Timer } from "./Timer/Timer";
import { ToDo } from "./To-Do/To-Do";
import { ToDoList } from "./To-Do/To-Do-List";

export const Home = () => {
    return <>
        <div className="listandtimer">
        <div className="list">
            <h3>To-Do-List</h3>
            <div className="ToDoListGroup">
           <ToDoList />
           </div>
        </div>

        <div className="timer">
            <h3>Focus Timer</h3>
            <Timer />
        </div>
        </div>
     

    </>
}