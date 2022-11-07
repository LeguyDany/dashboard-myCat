import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './navigation.css';

// ================ svg files ================
import logoWhite from './assets/other/LogoWhite.svg'
import iconDashBoard from "./assets/icons/dashboard-fill.svg"
import iconMyServices from "./assets/icons/list-ordered.svg"
import iconSettings from "./assets/icons/settings-4-fill.svg"
import iconLogout from "./assets/icons/logout-box-fill.svg"


interface NavLinksProps{
    title: string,
    img: string,
    navLink:string
}
const NavLinks: FC<NavLinksProps> = (props):JSX.Element => {
    /* Displays an icon with a label on the navigation bar. */
    return(
        <a href={props.navLink}>
            <img src={props.img}/>
            {props.title}
        </a>
    )
}
export function SideNav(){
    /* Builds a navigation bar on the left side of the screen. */

    return(
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
    )
}


interface HeaderIconsProps{
    data:{
        icon:string;
        link:string
    }
}
function HeaderIcons({data}:HeaderIconsProps){
    return(
        <a href={data.link}>
            <img src={data.icon}/>
        </a>
    )
}
export function Header(){
    /* Displays the header on right side of the screen. */
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const iconNotificationProps = {icon:"./assets/icons/.svg", link:"/"};
    const iconEditProps = {icon:"./assets/icons/.svg", link:"/"};


    return(
        <header>
            <p>{title}</p>

            <div>
                <HeaderIcons data={iconNotificationProps}/>
                <HeaderIcons data={iconEditProps}/>
                <p>{date}</p>
            </div>
        </header>
    )
}