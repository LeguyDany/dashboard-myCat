// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, {useEffect, useState} from 'react';
import {Header, SideNav} from './navigation';
import './dashboard.css';

import {SpotifyPlayerWidget} from "./widgets/SpotifyPlayerWidget";
import {SearchBarSpotify} from "./widgets/SearchBarSpotify";
import {SpotifyWaitingList} from "./widgets/SpotifyWaitingList";
import {WeatherWidget} from "./widgets/weather";
import axios from "axios";
// import {SpotifyWidget} from "./widgets/spotify";



// ------------------------------------- Widgets -------------------------------------

import {PostTweet} from './widgets/twitter';


// ------------------------------------- Widgets -------------------------------------
// import {} from './widgets/weather';

// ============================================= Components =============================================
// ------------------------------------- Test -------------------------------------
const Clock = () => {
    return(
        <input type="button" value="Bonjour"/>
    )
}

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
    const [autoPlayTrack, setAutoPlayTrack] = useState("")
    const [userInfo, setUserInfo] = useState(localStorage.getItem("user-info") || undefined)

    const playNow = (track : Track) => {
        setPlayingTrack(track.uri)
    }
    const addToWaitingList =(track : Track) => {
        if(waitingList.includes(track)) return
        setWaitingList([...waitingList, track])
    }
    const autoPlay = (track : Track) => {
        setAutoPlayTrack(track.uri)
        axios.post("http://localhost:8080/api/spotify/setautoplay",{track: track.uri},{
            headers: {
                authorization: `Bearer ${userInfo}`
            }
        })
    }
    const getAutoPlay = async () => {
        const res = await axios.get("http://localhost:8080/api/spotify/getautoplay", {
            headers:{
                authorization: `Bearer ${userInfo}`
            }
        })
        setAutoPlayTrack(res.data)
    }

    useEffect(()=>{
        getAutoPlay();

    }, [])

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
                    <WidgetTest widgetType="widget1" Widget={<SearchBarSpotify autoPlay={autoPlay} playNow={playNow} addToWaitingList={addToWaitingList}/>}/>
                    <WidgetTest widgetType="widget1" Widget={SpotifyPlayerWidget(playingTrack, autoPlayTrack)}/>
                    <WidgetTest widgetType="widget1" Widget={<SpotifyWaitingList waitingList={waitingList}/>}/>
                    {/*<WidgetTest widgetType="widget2" Widget={<WeatherWidget/>}/>*/}
                    {/*<WidgetTest widgetType="widget2" Widget={<PostTweet/>}/>*/}
                </article>
            </section>
        </>
    )
}