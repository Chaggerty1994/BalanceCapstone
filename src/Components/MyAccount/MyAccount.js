import { IconButton, Paper } from "@mui/material";
import React, { useEffect, useState, getItem } from "react";
import "./MyAccount.css"
import EditIcon from '@mui/icons-material/Edit';
import { useRouteMatch } from "react-router-dom";
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


    // declaring a state variable for the specific property of the user that you are 
    // editing when you click to edit button. its initial
    // value is set to null because it wont be anything until
    // you select one to edit.  
    const [userNameEditing, setUserNameEditing] = useState(null)
    const [userEmailEditing, setUserEmailEditing] = useState(null)
    const [usersUserNameEditing, setUsersUserNameEditing] = useState(null)

    //declaring a state variable for the new text that will be replacing
    // the old text . its initial value is an empty string.

    const [editingUserName, setEditingUserName] = useState("")
    const [editingUserEmail, setEditingUserEmail] = useState("")
    const [editingUsersUserName, setEditingUsersUserName] = useState('')

    const fetchUsers = () => {
        fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then((usersFromAPI) => {
                setUsers(usersFromAPI)
            })
    }

    const changeUser = (userObject) => {
        fetch(`http://localhost:8088/users/${userObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
            .then(res => res.json())
            .then(fetchUsers)
    }
        
    const editUserName = (userObject) => {
     
        const copy = { ...userObject }
        copy.name = editingUserName
        changeUser(copy)
        
    }

    const editUserEmail = (userObject) => {
     
        const copy = { ...userObject }
        copy.email = editingUserEmail
        changeUser(copy)
        
    }


    const editUsersUserName = (userObject) => {
     
        const copy = { ...userObject }
        copy.userName = editingUsersUserName
        changeUser(copy)
        
    }

    


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
                                    <ul >
                                    <h2 className="nameheader">Name</h2>
                                    <li className="name"  >  

                                    {userNameEditing === user.id ? (
                                          <input type="text" 
                                          onChange={(evt) => setEditingUserName(evt.target.value) } 
                                          value={editingUserName} />
                                    ) : (
                                        <> {user.name} </>
                                    )}
                                    </li>
                                    {userNameEditing === user.id ? (<button className="nameedit" 
                                    onClick={() => {
                                            editUserName(user)
                                            setUserNameEditing(null)
                                            
                                    }}> Submit Edit</button>) : 
                                        (<button className="namebutton" onClick={() => 
                                        setUserNameEditing(user.id)}> Edit Name </button>)}
                                    
                                      
                                    
                                    <hr />
                                    <h2 className="useremail">Email</h2>
                                    <li className="email"> 
                                    {userEmailEditing === user.id ? (
                                          <input type="text" 
                                          onChange={(evt) => setEditingUserEmail(evt.target.value) } 
                                          value={editingUserEmail} />
                                    ) : (
                                        <> {user.email} </>
                                    )}
                                      </li>
                                    {userEmailEditing === user.id ? (<button className="nameedit" 
                                    onClick={() => {
                                            editUserEmail(user)
                                            setUserEmailEditing(null)
                                            
                                    }}> Submit Edit</button>) : 
                                        (<button className="namebutton" onClick={() => 
                                        setUserEmailEditing(user.id)}> Edit Email </button>)}


                                  
                                    <hr />
                                    <h2>UserName</h2>
                                    <li className="email"> 
                                    {usersUserNameEditing === user.id ? (
                                          <input type="text" 
                                          onChange={(evt) => setEditingUsersUserName(evt.target.value) } 
                                          value={editingUsersUserName} />
                                    ) : (
                                        <> {user.userName} </>
                                    )}
                                        </li>
                                    {usersUserNameEditing === user.id ? (<button className="nameedit" 
                                    onClick={() => {
                                            editUsersUserName(user)
                                            setUsersUserNameEditing(null)
                                            
                                    }}> Submit Edit</button>) : 
                                        (<button className="namebutton" onClick={() => 
                                        setUsersUserNameEditing(user.id)}> Edit UserName </button>)}
                                    

                                    </ul>
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