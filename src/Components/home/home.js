import { Paper, Typography } from "@mui/material";
import React from "react";
import { ToDo } from "./To-Do/To-Do";
import { ToDoList } from "./To-Do/To-Do-List";

export const Home = () => {
    return <>
    
        <div>
            <h3>To-Do-List</h3>
           <ToDoList />
            <ToDo />
        </div>

        <div>
            <h3>Focus Timer</h3>
        </div>

     

    </>
}