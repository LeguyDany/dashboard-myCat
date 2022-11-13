import React, {useEffect, useState} from "react";
import axios from "axios";
import {userInfo} from "os";

interface Track {
    albumUrl: string,
    artist: string,
    title :string,
    uri : string
}

export function SpotifyWaitingList( waitingList: Array<Track> , playNow : Function){
    const [myWaitingList, setMyWaitingList] = useState<Array<Track>>([])
    const [userInfo, setUserInfo] = useState(localStorage.getItem("user-info") || undefined)

    useEffect(()=>{
        console.log(waitingList)
        setMyWaitingList(waitingList || undefined)

    }, [waitingList])

    return(
        <div>
            <h3>Favorite List</h3>
            {myWaitingList.map(track =>(
                <div key={track.uri}>
                    <img src={track.albumUrl}/>
                    <div> {track.title}</div>
                    <div> {track.artist}</div>
                    <button onClick={() => playNow(track)}> Play now</button>
                </div>
            ))}
        </div>
    )
}