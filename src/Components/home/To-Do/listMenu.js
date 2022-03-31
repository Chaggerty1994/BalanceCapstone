import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimerIcon from '@mui/icons-material/Timer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import "./To-Do.css"
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';



export const ListMenu = ({
    editingTask,
    changeTask,
    fetchTasks,
    taskEditing,
    setTaskEditing,
    setWorkMinutes,
    setRestMinutes,
    task,
    setEditingTask }) => {

    const editTask = (taskObject) => {

        const copy = { ...taskObject }
        copy.description = editingTask
        changeTask(copy)

    }

    const deleteTask = (id) => {
        fetch(`https://balance-api-drdtl.ondigitalocean.app/tasks/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(fetchTasks)



    }

    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openMenu = (evt) => {
        setAnchorEl(evt.currentTarget)
    }

    const data = task

    return (
        <>
            <IconButton
                onClick={openMenu}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                id="iconButton"
                className="iconmenu"
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="listMenu"
                MenuListProps={{ "task": task }}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >

                <MenuItem>
                    {taskEditing === task.id

                        ? (

                            <IconButton onClick={
                                () => {
                                    editTask(task)
                                    setTaskEditing(null)
                                }
                            }><CheckIcon /></IconButton>)
                        :
                        (<IconButton className="taskbutton" id={`${task.id}`}
                            onClick={() => {
                                const currentTask = task
                                debugger
                                setTaskEditing(currentTask.id)
                                setEditingTask(currentTask.description)
                            }}>
                            <EditIcon /> </IconButton>
                        )}
                </MenuItem>

                {task.team === false ? (
                        <MenuItem>
                        <IconButton className="taskbutton" 
                        onClick={
                            (evt) => {
                                const copy = { ...task }
                                copy.team = true
                                changeTask(copy)
                            }
                        }>
                        <GroupsIcon />
                        </IconButton>
                        </MenuItem>
                ) : (
                    <MenuItem>
                    <IconButton className="taskbutton" 
                    onClick={
                        (evt) => {
                            const copy = { ...task }
                            copy.team = false
                            changeTask(copy)
                        }
                    }>
                    <PersonIcon />
                    </IconButton>
                    </MenuItem>
                )}

            

             

                <MenuItem>
                    <IconButton className="taskbutton" onClick={(evt) => {
                        setWorkMinutes(task.timer.aLength)
                        setRestMinutes(task.timer.bLength)

                        // console.log(workMinutes, restMinutes)
                    }}><TimerIcon /></IconButton>
                </MenuItem>

                <MenuItem>
                    <IconButton className="taskbutton" onClick={() => {
                        deleteTask(task.id)
                    }}><DeleteIcon /></IconButton>
                </MenuItem>


            </Menu>

        </>
    )
}