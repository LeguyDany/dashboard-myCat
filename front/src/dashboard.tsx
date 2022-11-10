// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { useState } from 'react';
import {SideNav, Header} from './navigation';
import './dashboard.css';
import './widgets/SpotifyPlayerWidget'
import {SpotifyPlayerWidget} from "./widgets/SpotifyPlayerWidget";
import {SearchBarSpotify} from "./widgets/SearchBarSpotify";
import {SpotifyWaitingList} from "./widgets/SpotifyWaitingList";



// ------------------------------------- Widgets -------------------------------------
// import {} from './widgets/weather';

// ============================================= Components =============================================
// ------------------------------------- Test -------------------------------------
const Clock = () => {
    return(
        <input type="button" value="Bonjour"/>
    )
}
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


interface Track {
    albumUrl: string,
    artist: string,
    title :string,
    uri : string
}

// ------------------------------------- Composition -------------------------------------
export function ComposeDashboard(){
    const [page, setPage] = useState("Dashboard");
    const [playingTrack, setPlayingTrack] = useState<string>("")
    const [waitingList, setWaitingList] = useState<Array<Track>>([]);

    const playNow = (track : Track) => {
        setPlayingTrack(track.uri)
    }
    const addToWaitingList =(track : Track) => {
        let myArray: Array<Track> = waitingList
        if(myArray.includes(track)) return
        setWaitingList([...waitingList, track])
    }

    return(
        <>
            <SideNav />
            <section className="content">
                <Header page={page}/>
                <article>
                    <WidgetTest widgetType="widget1" Widget={<Clock/>}/>
                    <WidgetTest widgetType="widget1" Widget={<Clock/>}/>
                    <WidgetTest widgetType="widget2" Widget={<Clock/>}/>
                    <WidgetTest widgetType="widget1" Widget={<Clock/>}/>
                    <WidgetTest widgetType="widget1" Widget={<Clock/>}/>
                    <WidgetTest widgetType="widget1" Widget={<SearchBarSpotify playNow={playNow} addToWaitingList={addToWaitingList}/>}/>
                    <WidgetTest widgetType="widget1" Widget={SpotifyPlayerWidget(playingTrack)}/>
                    <WidgetTest widgetType="widget1" Widget={<SpotifyWaitingList waitingList={waitingList}/>}/>
                </article>
            </section>
        </>
    )
}