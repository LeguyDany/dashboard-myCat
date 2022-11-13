// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './twitter.css';


// ============================================= Components =============================================
// ------------------------------------- Interfaces -------------------------------------


// ------------------------------------- Child -------------------------------------



// ------------------------------------- Main component -------------------------------------
export function TwitterLogin(){
    let params =  new URLSearchParams(document.location.search);
    // @ts-ignore
    const [code, setCode] = useState<String>(params.get("code"));


    const codeHandler = async () => {

        if(!code){window.location.replace("https://twitter.com/i/oauth2/authorize?response_type=code&client_id=T3ZMY1lIQkw2b2FmWmlIdmdfN1M6MTpjaQ&redirect_uri=http://localhost:3000/twitterLogin&scope=tweet.read tweet.write users.read offline.access&state=state&code_challenge=challenge&code_challenge_method=plain")}

        const res = await axios.post("http://localhost:8080/api/twitter/generateToken", {code});

        localStorage.setItem("access_token_twitter", res.data.access_token);
        localStorage.setItem("refresh_token_twitter", res.data.refresh_token);

        // @ts-ignore
        window.location.replace("http://localhost:3000/dashboard");
    }


    useEffect(()=>{
        codeHandler()
    },[])

    return(
        <div>
            loading...
        </div>
    )
}