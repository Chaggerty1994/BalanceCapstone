
import React from "react"
import { Route } from "react-router-dom"

import { Home } from "./Components/home/home"
import { MyAccount } from "./Components/MyAccount/MyAccount"


export const ApplicationViews = () => {
    return (
         <>
            <Route exact path="/home">
                <Home />
            </Route>

            <Route exact path="/myaccount">
                <MyAccount />
            </Route>
        
        </>
    )
}