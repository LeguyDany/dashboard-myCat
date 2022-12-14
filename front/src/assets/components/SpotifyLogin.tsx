import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export function SpotifyLogin (){
    const [islogged, setIslogged] = useState(false);
    const [accesToken, setAccesToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [expireIn, setExpireToken] = useState("");
    const [code, setCode] = useState("");
    let params =  new URLSearchParams(document.location.search);
    const AUTH_URL = "http://accounts.spotify.com/authorize?client_id=80db1bd3fc9845ad9a188627e68e774a&response_type=code&redirect_uri=http://localhost:3000/services&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";


    useEffect(()=>{
        // @ts-ignore
        setCode(params.get("code"));
        async function fetchData(){
            if(code !== "" && code !== null){
                let res = await axios.post("http://localhost:8080/api/spotify/login", {code: code})
                localStorage.setItem("tokenSpotify", res.data.access_token)
                // @ts-ignore
                window.history.pushState({}, null, "/")
            }
        }
        fetchData();
    })

    return (
     <>
         {<a href={AUTH_URL}>Connect with spotify</a>}
     </>
    )
}