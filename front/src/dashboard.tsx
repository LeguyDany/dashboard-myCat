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
import {PostTweet, GetTweetByHashtag, GetTwitterUser} from './widgets/twitter';
// import {SpotifyWidget} from "./widgets/spotify";



// ------------------------------------- Widgets -------------------------------------


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

    const addToWaitingList = async (track : Track) => {

        if(waitingList.includes(track)) return
        await setWaitingList([...waitingList, track])
        axios.post("http://localhost:8080/api/spotify/setfavoritlist", [...waitingList, track],{
            headers: {
                authorization: `Bearer ${userInfo}`
            }
        })
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
        (async() =>{
            const res = await axios.get("http://localhost:8080/api/spotify/getfavoritlist",{
                headers:{
                    authorization: `Bearer ${userInfo}`
                }})
            await setWaitingList(res.data)
        })()
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
                    <WidgetTest widgetType="widget1" Widget={SpotifyWaitingList(waitingList, playNow)}/>
                    {/*<WidgetTest widgetType="widget2" Widget={<WeatherWidget/>}/>*/}
                    {/*<WidgetTest widgetType="widget2" Widget={<PostTweet/>}/>*/}
                    <WidgetTest widgetType="widget2" Widget={<WeatherWidget/>}/>
                    <WidgetTest widgetType="widget1" Widget={<PostTweet/>}/>
                    <WidgetTest widgetType="widget1" Widget={<GetTweetByHashtag/>}/>
                    <WidgetTest widgetType="widget1" Widget={<GetTweetByHashtag/>}/>
                    <WidgetTest widgetType="widget1" Widget={<GetTwitterUser/>}/>
                </article>
            </section>
        </>
    )
}