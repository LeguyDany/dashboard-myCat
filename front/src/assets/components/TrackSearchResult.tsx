import React from "react";

// @ts-ignore
export default function TrackSearchResult( { track, playNow, addToWaitingList }){


    return(
        <div>
            <img src={track.albumUrl}/>
            <div> {track.title}</div>
            <div> {track.artist}</div>
            <button onClick={() => addToWaitingList(track)}>Add to waiting list</button>
            <button onClick={() => playNow(track)}> Play now</button>
        </div>
    )

}