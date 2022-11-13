import React from "react";

// @ts-ignore
export default function TrackSearchResult( { track, playNow, addToWaitingList, autoPlay }){


    return(
        <div>
            <img src={track.albumUrl}/>
            <div> {track.title}</div>
            <div> {track.artist}</div>
            <button onClick={() => addToWaitingList(track)}>Add to favorite list</button>
            <button onClick={() => playNow(track)}> Play now</button>
            <button onClick={() => autoPlay(track)}>AutoPlay</button>
        </div>
    )

}