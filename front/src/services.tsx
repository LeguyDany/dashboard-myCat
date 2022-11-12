import {SpotifyWidget} from "./widgets/spotify";
import React, {useState} from "react";
import {Header, SideNav} from "./navigation";
import {SpotifyLogin} from "./widgets/SpotifyLogin";

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


export function Services(){
    const [page, setPage] = useState("My services");
    return(
        <>
            <SideNav />
            <section className="content">
                <Header page={page}/>
                <WidgetTest widgetType="widget1" Widget = {<SpotifyLogin/>}/>
            </section>
        </>
    )
}