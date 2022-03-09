import React from "react";
import { Route } from "react-router-dom"
import { Balance } from "./Balance";


export const AppViews = () => {
    return (
        <>
            <Route exact path="/home">
              <Balance />
            </Route>

           
            
        
        </>
    )
}