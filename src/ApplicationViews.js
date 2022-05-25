
import React from "react"
import { Route } from "react-router-dom"

import { Home } from "./Components/home/home"
import { MyAccount } from "./Components/MyAccount/MyAccount"
import { MyTeam } from "./Components/Teams/Teams.js"
import { MyAccountDetails } from "./Components/MyAccount/MyAccountRefactor"
import { MyAccountEdit } from "./Components/MyAccount/editUserForm"


export const ApplicationViews = () => {
    return (
         <>
            <Route exact path="/home">
                <Home />
            </Route>

            {/* <Route exact path="/myaccount">
                <MyAccount />
            </Route> */}

            <Route exact path="/myaccountnew">
                <MyAccountDetails />
            </Route>

            <Route exact path="/myaccountedit">
                <MyAccountEdit />
            </Route>
{/*             
            <Route exact path="/myteam">
                <MyTeam />
            </Route> */}
        
        </>
    )
}