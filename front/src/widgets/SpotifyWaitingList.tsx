import React, {useEffect, useState} from "react";

interface Track {
    albumUrl: string,
    artist: string,
    title :string,
    uri : string
}

export function SpotifyWaitingList({waitingList}: { waitingList: Track[] }){
    const [myWaitingList, setMyWaitingList] = useState<Array<Track>>([])

    useEffect(()=>{ setMyWaitingList(waitingList)}, [waitingList])

    return(
        <div>
            <h3>Favorite List</h3>
            {myWaitingList.map(track =>(
                <div key={track.uri}>
                    <img src={track.albumUrl}/>
                    <div> {track.title}</div>
                    <div> {track.artist}</div>
                </div>
            ))}
        </div>
    )
}