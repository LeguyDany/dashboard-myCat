
import React, {useState, useEffect} from "react";
import axios from 'axios';
import SpotifyPlayer from "react-spotify-web-playback"


export function SpotifyWidget(){
    const tokenSpotify = localStorage.getItem("tokenSpotify")
    if(!tokenSpotify) return null
    return (
        <div>
            <SpotifyPlayer token={tokenSpotify}
            showSaveIcon
            />
        </div>
    )
}
