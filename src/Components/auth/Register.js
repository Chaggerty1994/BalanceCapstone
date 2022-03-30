import { Button, Paper } from "@mui/material"
import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("balance_user", createdUser.id)
                                history.push("/home")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>
            <h1 className="registerheader">Registration</h1>
            <div className="account">
                <Paper className="accountinfo"
                    elevation={12}
                    style={{
                        margin: "0px 0px 8px 0px",
                        border: "2px solid purple"
                    }}>
                    <form className="registerlogin" onSubmit={handleRegister}>
                        <ul>
                            <label htmlFor="name"> Full Name </label>
                            <li className="registername">
                                <fieldset>

                                    <input onChange={updateUser}
                                        type="text" id="name" className="form-control"
                                        placeholder="Enter your name" required autoFocus />
                                </fieldset>
                            </li>
                            <hr />
                            <label htmlFor="userName"> User Name </label>
                            <li className="registerusername">
                                <fieldset>

                                    <input onChange={updateUser} type="text" id="userName" className="form-control" placeholder="User Name" required />
                                </fieldset>
                            </li>
                            <hr />
                            <label htmlFor="email"> Email address </label>
                            <li className="registeremail">
                                <fieldset>

                                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                                </fieldset>
                            </li>
                       
                            <fieldset>
                                <Button type="submit" > Register </Button>
                            </fieldset>
                        </ul>
                    </form>
                </Paper>
            </div>
        </main>
    )
}

