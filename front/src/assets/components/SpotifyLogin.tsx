import {useEffect, useState} from "react";
import axios from "axios";

export function SpotifyLogin (){
    const [code, setCode] = useState("");
    let params =  new URLSearchParams(document.location.search);

    async function navigateTo(){
        window.location.replace("http://accounts.spotify.com/authorize?client_id=80db1bd3fc9845ad9a188627e68e774a&response_type=code&redirect_uri=http://localhost:3000/services&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchData(){

        if (code !== "" && code !== null){
            let res = await axios.post("/api/spotify/login",{code})
            localStorage.setItem("tokenSpotify", res.data.access_token)
            // @ts-ignore
            window.history.pushState({}, null, "/")
        }
    }

    useEffect(()=>{
        // @ts-ignore
        setCode(params.get("code"));
        fetchData();
    }, [params, fetchData])

    return (
     <>
        <input type="button" value="connect with spotify" onClick={navigateTo}/>
     </>
    )
}