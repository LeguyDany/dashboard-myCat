// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, {DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState} from 'react';
import axios from 'axios';
import './twitter.css';


// ------------------------------------- Images / svg -------------------------------------
import twitterIcon from '../assets/icons/twitterIcon.svg';
import imgIcon from '../assets/icons/image-line.svg';
import pollIcon from '../assets/icons/chat-poll-line.svg';


// ============================================= Components =============================================
// ------------------------------------- Interfaces -------------------------------------
interface pollLength{
    days:string;
    hours:string;
    minutes:string;
}
interface formDataTweet{
    text: string,
    choice1: string | undefined,
    choice2: string | undefined,
    choice3: string | undefined,
    choice4: string | undefined,
    days: string,
    hours: string,
    minutes: string,
    access_token_twitter:string | null ,
    refresh_token_twitter:string | null,
}


// ------------------------------------- Child -------------------------------------


// ------------------------------------- Main component -------------------------------------
export function PostTweet(){
    /* Allows the connected user to post a tweet. */
    const access_token_twitter = localStorage.getItem("access_token_twitter");
    const refresh_token_twitter = localStorage.getItem("refresh_token_twitter");
    const [urlProfile, setUrlProfile] = useState<string>();
    const [text, setText] = useState<string>("");
    const [reply_settings, setReplySettings] = useState<String>();
    const [pollSelect, setPollSelect] = useState<string>("");
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [days, setDays] = useState<string>("0");
    const [hours, setHours] = useState<string>("0");
    const [minutes, setMinutes] = useState<string>("0");


    const clearPoll = () => {
        setPollSelect("");
        setChoice1("");
        setChoice2("");
        setChoice3("");
        setChoice4("");
        setDays("0");
        setHours("0");
        setMinutes("0");
        // @ts-ignore
        document.querySelector('#choice1').value = null;
        // @ts-ignore
        document.querySelector('#choice2').value = null;
        // @ts-ignore
        document.querySelector('#choice3').value = null;
        // @ts-ignore
        document.querySelector('#choice4').value = null;
        // @ts-ignore
        document.querySelector('#days').value = null;
        // @ts-ignore
        document.querySelector('#hours').value = null;
        // @ts-ignore
        document.querySelector('#minutes').value = null;
    }

    const handlePollOption = () => {
        switch(pollSelect){
            case "":
                setPollSelect("twitterPostOptionSelected");
                break;
            case "twitterPostOptionSelected":
                clearPoll();
                break;
        }
    }

    const postForm = async () => {
        let formData = new FormData();

        const data:formDataTweet = {
            text: text,
            choice1: choice1,
            choice2: choice2,
            choice3: choice3,
            choice4: choice4,
            days: days,
            hours: hours,
            minutes: minutes,
            access_token_twitter: access_token_twitter,
            refresh_token_twitter: refresh_token_twitter,
        }

        for(const item in data){
            // @ts-ignore
            formData.append(item, data[item]);
        }

        try {
            const res = await axios.post("http://localhost:8080/api/twitter/postTweet", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        const data = async () => {
            const res = await axios.post("http://localhost:8080/api/twitter/getProfile", {access_token_twitter, refresh_token_twitter})
            setUrlProfile(res.data.profile_image_url);
        }
        data();

    },[])

    return(
        <section className="twitterPost">
            <div className="compHead">
                <div>
                    <img src={twitterIcon}/>
                    <h1>Twitter - Post a tweet</h1>
                </div>
                <hr/>
            </div>

            <div>
                <img src={urlProfile} alt="Profile picture"/>
                <select onChange={e => setReplySettings(e.target.value)}>
                    <option value="">Everyone can answer</option>
                    <option value="following">Only people I follow can answer</option>
                    <option value="mentionedUsers">Only mentioned users can answer</option>
                </select>
            </div>

            <div >
                <h2>Your tweet</h2>
                <textarea maxLength={200} onChange={e => setText(e.target.value)} required/>
            </div>

            <hr className="lightSeparator"/>

            {/* --------------------------------- poll ---------------------- */}
            <div className={`tweetPostPoll ${pollSelect=="twitterPostOptionSelected"?"":"displayNone"}`}>
                <form>
                    <legend>Poll</legend>
                    <input type="text" placeholder="Choice 1" onChange={e => setChoice1(e.target.value)} maxLength={25} id="choice1"/>
                    <input type="text" placeholder="Choice 2" onChange={e => setChoice2(e.target.value)} maxLength={25} id="choice2"/>
                    <input type="text" placeholder="Choice 3 (optional)" onChange={e => setChoice3(e.target.value)} maxLength={25} id="choice3"/>
                    <input type="text" placeholder="Choice 4 (optional)" onChange={e => setChoice4(e.target.value)} maxLength={25} id="choice4"/>

                    <div>
                        <h3>Poll length</h3>
                        <div>
                            <label>
                                <p>Days</p>
                                <input type="number" onChange={e => {setDays(e.target.value)}} name="days" id="days" min={0} max={7}/>
                            </label>
                            <label>
                                <p>Hours</p>
                                <input type="number" onChange={e => {setHours(e.target.value)}} name="hours" id="hours" min={0} max={23}/>
                            </label>
                            <label>
                                <p>Minutes</p>
                                <input type="number" onChange={e => {setMinutes(e.target.value)}} name="minutes" id="minutes" min={0} max={59}/>
                            </label>
                        </div>
                    </div>


                </form>
                <hr className="lightSeparator"/>
            </div>

            <div className={"twitterPostOptions"}>
                <img src={pollIcon} className={pollSelect} onClick={handlePollOption}/>
            </div>

            <input type="submit" value="Post a poll tweet" onClick={postForm}/>
        </section>
    )
}