
import React from "react";
import { ApplicationViews } from "../ApplicationViews";


import { NavBar } from "./NavBar/NavBar";

import "./Balance.css"
import { Redirect, Route } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";


export const Balance = () => {
    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("balance_user")) {
                        return (
                            <>
                                <NavBar />

                                <ApplicationViews />
                                <h1 className="pageheader">Bal_ance</h1>
                                {/* <img className="logo" src="./BalanceLogo.png"/> */}
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}

            />

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

        </>
    )
}
