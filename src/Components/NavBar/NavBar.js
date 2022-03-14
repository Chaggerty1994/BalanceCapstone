import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
export const NavBar = () => {


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myaccount"><AccountBoxRoundedIcon /></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home"><HomeRoundedIcon /></Link>
            </li>
           

            <li className="navbar__item active">
                <Link className="navbar__link" to="/login"
                
                onClick={
                    () => {
                        localStorage.removeItem("balance_user")
                    }
                }>
                    <ExitToAppRoundedIcon /></Link>
            </li>
        </ul>
    )
}