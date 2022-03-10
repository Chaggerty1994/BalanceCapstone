
import React from "react"
import { Route } from "react-router-dom"

import { Home } from "./Components/home/home"


export const ApplicationViews = () => {
    return (
         <>
            <Route exact path="/home">
                <Home />
            </Route>
        
        
        </>
    )
}