import React, {useState, useEffect} from "react";
import SpotifyPlayer from "react-spotify-web-playback"


export function SpotifyPlayerWidget(trackUri: string, autoPlayTrack: string){
    //tracks, changeTrack
    const tokenSpotify = localStorage.getItem("tokenSpotify")
    const [play, setPlay] = useState(false)
    if(!tokenSpotify) return null

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => setPlay(true), [trackUri])

    return (
        <div>
            <SpotifyPlayer token={tokenSpotify}
                           showSaveIcon
                           callback={state => {
                               if(!state.isPlaying) setPlay(false)
                           }}
                           play={play}
                           uris={trackUri ? [trackUri] : [autoPlayTrack]}
            />
            {/*<button onClick={changeTrack (tracks)}></button>*/}
        </div>
    )
}