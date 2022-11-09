// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {SideNav, Header} from './navigation';
import './dashboard.css';

// ------------------------------------- Widgets -------------------------------------
import {WeatherWidget} from './widgets/weather';



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