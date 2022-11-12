// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './twitter.css';


// ============================================= Components =============================================
// ------------------------------------- Interfaces -------------------------------------


// ------------------------------------- Child -------------------------------------



// ------------------------------------- Main component -------------------------------------
export function PostTweet(){
    /* Allows the connected user to post a tweet. */
    const access_token_twitter = localStorage.getItem("access_token_twitter");

    const handlePost = async () => {
        const res = await axios.post("http://localhost:8080/api/twitter/postTweet", {access_token_twitter});
        console.log(res.data);
    }

    return(
        <section>
            <input type="submit" value="Post a poll tweet" onClick={handlePost}/>
        </section>
    )
}