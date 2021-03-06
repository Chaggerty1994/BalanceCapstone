import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"
import LoginIcon from '@mui/icons-material/Login';
import { Button, Paper } from "@mui/material";

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://balance-api-drdtl.ondigitalocean.app/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("balance_user", exists.id)
                    history.push("/home")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <h1 className="loginheader">Bal_ance</h1>
            <div className="account">
        <Paper className="accountinfo"
            elevation={12}
            style={{
                margin: "0px 0px 8px 0px",
                border: "2px solid purple" 
                }}>
            <section>
                    
                <form className="form--login" onSubmit={handleLogin}>
                   
                    <h2 className="loginheader2">Please sign in</h2>
                    <fieldset className="emailaddress">
                        {/* <label htmlFor="inputEmail"> Email address </label> */}
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <Button className="signin" type="submit">
                            <LoginIcon />
                        </Button>
                    </fieldset>
                </form>
           
            <section className="form--login">
                <Link to="/register">Not a member yet?</Link>
            </section>
            </section>
            </Paper>
            </div>
        </main>
    )
}

