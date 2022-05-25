import { Button, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState, getItem } from "react";
import EditIcon from '@mui/icons-material/Edit';
import "./MyAccount.css"
import { useHistory } from "react-router-dom";



export const MyAccountEdit = () => {

    const [currentUser, setCurrentUser] = useState({
        name: "",
        teamId: 0,
        userName: "",
        email: "",
    })

    const userId = localStorage.getItem("balance_user")
    console.log(userId)


    useEffect(
        () => {
            fetch("https://balance-api-drdtl.ondigitalocean.app/users")
                .then(res => res.json())
                .then((usersArray) => {
                    const userNow = usersArray.find(
                        u => u.id === parseInt(userId))
                    console.log(userNow)
                    setCurrentUser(userNow)
                })
        }, []
    )

    const history = useHistory()

    const changeUser = (userObject) => {
       return fetch(`https://balance-api-drdtl.ondigitalocean.app/users/${userObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
       
    }

    const changeUserDetails = (event) => {
        const copy = { ...currentUser }
        copy[event.target.name] = event.target.value
        setCurrentUser(copy)
    }

    const submitEdits = (evt) => {

        evt.preventDefault()

        const editUserObj = {
            id: currentUser.id,
            name: currentUser.name,
            teamId: currentUser.teamId,
            userName: currentUser.userName,
            email: currentUser.email
        }

        changeUser(editUserObj).then(() => history.push("/myaccountnew"))
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


                    <div className="accountdetails">
                        <ul>
                            <h2 className="nameheadder">Name</h2>
                            <li className="name">
                                <input type="text" name="name"
                                    value={currentUser.name}
                                    onChange={changeUserDetails}
                                />


                            </li>

                            <hr />

                            <h2 className="useremail"> Email </h2>
                            <li className="email">
                                <input type="text" name="email"
                                    value={currentUser.email}
                                    onChange={changeUserDetails }
                                />
                            </li>

                            <hr />

                            <h2 className="username">UserName</h2>
                            <li className="username">
                                <input type="text" name="userName"
                                    value={currentUser.userName}
                                    onChange={changeUserDetails}
                                />
                            </li>
                        </ul>




                        <Button 
                        className="submitedit" 
                        id="editsubmit"
                        onClick={submitEdits} >
                            Submit Edits
                        </Button>
                    </div>

                </Paper>

            </div>

        </>
    )
}