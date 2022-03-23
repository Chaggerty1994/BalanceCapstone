import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import { pink, purple } from '@mui/material/colors';


export const NavBar = () => {


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myaccount"><AccountBoxRoundedIcon sx={{ color: [100] }} /></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/home"><HomeRoundedIcon sx={{ color: [500] }} /></Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/myteam"><GroupsIcon sx={{ color: [500] }}  /></Link>
            </li>
           

            <li className="navbar__item active">
                <Link className="navbar__link" to="/login"
                
                onClick={
                    () => {
                        localStorage.removeItem("balance_user")
                    }
                }>
                    <ExitToAppRoundedIcon sx={{ color: [500] }} /></Link>
            </li>
        </ul>
    )
}