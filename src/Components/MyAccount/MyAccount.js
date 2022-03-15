import { IconButton, Paper } from "@mui/material";
import React, { useEffect, useState, getItem } from "react";
import "./MyAccount.css"
import EditIcon from '@mui/icons-material/Edit';
// im going to access only the currently signed in users information
// display that information 
// then make each property editable



export const MyAccount = () => {

    // defining a state variable and setter function for the users
    const [users, setUsers] = useState([])
    // doing a fetch call for an array of all the users in the API
    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                })
        },
        []
    )

    const [currentUser, setCurrentUser] = useState(0)


    useEffect(
        () => {
            setCurrentUser(userId)
        }, []
    )
        console.log(currentUser)
 
    // assigning the value of the user in localstorage to a variable
        const userId = localStorage.getItem("balance_user")
        console.log(userId)

    return (
        
        
        <>
        <div className="account">
        <Paper className="accountinfo"
            elevation={12}
            style={{
                margin: "0px 0px 8px 0px",
                border: "2px solid purple" 
                }}>
                    {
                        currentUser && users ?    
                        users.map (
                            (user) => { 

                                // need to figure out how to get the currently logged in user 
                                // so i can compare id to the users being mapped
                                if (user.id === parseInt(currentUser)) {
                                    return  <>
                                        <div className="accountdetails">
                                    <Paper className="user_name"
                                    elevation={12}
                                    style={{
                                        margin: "25px 25px 25px 25px",
                                        // border: "2px solid purple"
                                    }}>
                                  
                                    <li className="name"> 
                                    {user.name} 
                                    <IconButton> <EditIcon /> </IconButton>
                                    </li>
                                    </Paper>
                                    <h2>Email</h2>
                                    <li className="email"> 
                                    {user.email} 
                                    <IconButton className="nameIcon"> <EditIcon /> </IconButton>
                                    </li>
                                    <h2>UserName</h2>
                                    <li className="email"> 
                                    {user.userName} 
                                    <IconButton> <EditIcon /> </IconButton>
                                    </li>
                                    </div>
                                         </>
                                    
                                          
                                }
                            }
                        ) : "" 
                    }
       
        </Paper >
        </div>
        </>
    )
}