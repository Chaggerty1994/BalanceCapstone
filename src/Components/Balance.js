import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AppViews } from "../ApplicationViews";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";

import { NavBar } from "../nav/NavBar";


export const Balance = () => {
    return (
        <>

        <Route
            render={() => {
                if (localStorage.getItem("balance_user")) {
                    return (
                        <>
                        <NavBar />
                         <h1>Bal.Ance</h1>
                         <AppViews />
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