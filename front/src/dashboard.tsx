// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {SideNav, Header} from './navigation';
import './dashboard.css';
import './widgets/spotify'
// import {SpotifyWidget} from "./widgets/spotify";
import axios from "axios";


// ------------------------------------- Widgets -------------------------------------
import {WeatherWidget} from './widgets/weather';
// const SpotifyWebApi = require('spotify-web-api-node');


// ============================================= Components =============================================
// ------------------------------------- Widget building -------------------------------------
interface widgetType {
    widgetType:string,
    Widget:React.ReactNode,
}
const WidgetTest = ({widgetType, Widget}:widgetType) => {
    return(
        <article className={`shadow0 ${widgetType}`}>
            {Widget}
        </article>
    )
}

// ------------------------------------- Composition -------------------------------------
export function ComposeDashboard(){
    const [page, setPage] = useState("Dashboard");
    const track = [];
    return(
        <>
            <SideNav />
            <section className="content">
                <Header page={page}/>
                <article>
                    <WidgetTest widgetType="widget2" Widget={<WeatherWidget/>}/>
                </article>
            </section>
        </>
    )
}