import { Button, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState, getItem } from "react";
import "./Teams.css"
import EditIcon from '@mui/icons-material/Edit';
import { useRouteMatch } from "react-router-dom";
// im going to access only the currently signed in users information
// display that information 
// then make each property editable



export const MyTeam = () => {

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

    const [teamMembers, setTeamMembers] = useState([])

    const [currentTeam, setCurrentTeam] = useState([])


    
    useEffect(
        () => {
            fetch("http://localhost:8088/teamMembers?_expand=user")
                .then(res => res.json())
                .then((membersArray) => {
                    // find team member with same user id as the currentUser
                    const teamMember = membersArray.find(
                        member => member.userId === parseInt(currentUser))
                    console.log(teamMember)
                    // membersArray.filter all teammembers with team id as the user
                    if (teamMember) {const currentTeam = membersArray.filter(
                        member => member.teamId === teamMember.teamId)
                   console.log(currentTeam)
                    setTeamMembers(currentTeam)}
                })
        },
        [currentUser]
    )

 
        
  
        // console.log(currentUser)
        // console.log(teamMembers)
 
    // assigning the value of the user in localstorage to a variable

        const userId = localStorage.getItem("balance_user")
        // console.log(userId)




    const fetchUsers = () => {
        fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then((usersFromAPI) => {
                setUsers(usersFromAPI)
            })
    }

    // const changeUser = (userObject) => {
    //     fetch(`http://localhost:8088/users/${userObject.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(userObject)
    //     })
    //         .then(res => res.json())
    //         .then(fetchUsers)
    // }
        
 

    


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
                        // currentUser && users  ?    
                        users.map (
                            (user) => { 
                                // console.log(member)
                            
                                if (user.id === parseInt(currentUser)) {
                                    return  <>
                                    <div className="myteam">
                                    <ul >
                                    <h2 className="teamheader">MyTeam</h2>
                                    <li className="myteamlist">
                                       <div className="myteamlist">
                                            {
                                                teamMembers.map(
                                                    (member) => {
                                                      
                                                            return <>
                                                            <ul>

                                                                <li key={member.id} className="teamlist">
                                                                   {member.user.name}
                                                                
                                                                </li>
                                                            </ul>
                                                            </>
                                                        
                                                    }
                                                )
                                            }
                                       </div>
                                    </li>
                                     

                                    
                                  
                                   
                                    
                                    

                                    </ul>
                                    </div>
                                         </>
                                    
                                          
                                }
                            }
                        ) 
                    }
       
        </Paper >
        </div>
        </>
    )
}