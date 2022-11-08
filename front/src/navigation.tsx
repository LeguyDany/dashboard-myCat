import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './navigation.css';

// ================ svg files ================
// ---------------- navigation ----------------
import logoWhite from './assets/other/LogoWhite.svg';
import iconDashBoard from "./assets/icons/dashboard-fill.svg";
import iconMyServices from "./assets/icons/list-ordered.svg";
import iconSettings from "./assets/icons/settings-4-fill.svg";
import iconLogout from "./assets/icons/logout-box-fill.svg";

// ---------------- header ----------------
import iconNotification from './assets/icons/notification-line.svg';
import iconEdit from './assets/icons/edit-2-line.svg';

interface NavLinksProps{
    title: string,
    img: string,
    navLink:string
};
const NavLinks: FC<NavLinksProps> = (props):JSX.Element => {
    /* Displays an icon with a label on the navigation bar. */
    return(
        <a href={props.navLink}>
            <img src={props.img}/>
            {props.title}
        </a>
    )
};
export function SideNav(){
    /* Builds a navigation bar on the left side of the screen. */

    return(
        <>
        <section className={"NavBar"}>
            <img src={logoWhite} alt="Logo"/>
            <hr/>
            <div>
                <NavLinks title={"Dashboard"} img={iconDashBoard} navLink={"/"}/>
                <NavLinks title={"My services"} img={iconMyServices} navLink={"/"}/>
                <NavLinks title={"Settings"} img={iconSettings} navLink={"/"}/>
                <NavLinks title={"Logout"} img={iconLogout} navLink={"/"}/>
            </div>
        </section>
        </>
    )
};


interface HeaderIconsProps{
    icon:string;
    link:string
};
const HeaderIcons: FC<HeaderIconsProps> = (props):JSX.Element => {
    return(
        <a href={props.link}>
            <img src={props.icon}/>
        </a>
    )
};
interface HeaderPropsPage{
    page:string;
}
export function Header({page}:HeaderPropsPage){
    /* Displays the header on right side of the screen. */
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");


    useEffect(()=> {
        const today = new Date().toISOString().slice(0, 10);
        setDate(today);
        setTitle(page);
    })

    return(
        <header>
            <h1>{title}</h1>

            <div>
                <HeaderIcons icon={iconNotification} link="/"/>
                <p>{date}</p>
            </div>
        </header>
    )
};