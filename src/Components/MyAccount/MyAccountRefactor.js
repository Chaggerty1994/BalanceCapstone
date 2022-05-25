import { Button, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState, getItem } from "react";
import EditIcon from '@mui/icons-material/Edit';
import "./MyAccount.css"
import { Link } from "react-router-dom";



export const MyAccountDetails = () => {

    const [currentUser, setCurrentUser] = useState({})

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


    // const changeUser = (userObject) => {
    //     fetch(`https://balance-api-drdtl.ondigitalocean.app/users/${userObject.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(userObject)
    //     })
    //         .then(res => res.json())
    //     // .then(getCurrentUser())
    // }


    // const [userEditing, setUserEditing] = useState(null)

    // const [editingUser, setEditingUser] = useState("")

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

                                <>{currentUser.name}</>

                            </li>

                            <hr />

                            <h2 className="useremail"> Email </h2>
                            <li className="email">
                                <>{currentUser.email}</>
                            </li>

                            <hr />

                            <h2 className="username">UserName</h2>
                            <li className="username" id="usernametext">
                                <>{currentUser.userName}</>
                            </li>

                            
                            <Link to={`myaccountedit`}>
                                <Button className="edit" id={`${currentUser.id}`} >
                                    Edit User Details
                                </Button>
                            </Link>
                        </ul>




                    </div>

                </Paper>

            </div>

        </>
    )
}