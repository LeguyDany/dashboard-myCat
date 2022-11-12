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

// ------------------------------------- Child -------------------------------------


// ------------------------------------- Main component -------------------------------------
export function PostTweet(){
    /* Allows the connected user to post a tweet. */
    const access_token_twitter = localStorage.getItem("access_token_twitter");
    const refresh_token_twitter = localStorage.getItem("refresh_token_twitter");
    const [urlProfile, setUrlProfile] = useState<string>();
    const [media, setMedia] = useState<any>();
    const [text, setText] = useState<string>();
    const [reply_settings, setReplySettings] = useState<String>();
    const [imgSelect, setImgSelect] = useState<string>("");
    const [pollSelect, setPollSelect] = useState<string>("");
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [pollLength, setPollLength] = useState<pollLength>({days:"0", hours:"0", minutes:"0"});


    const handlePost = async () => {
        const res = await axios.post("http://localhost:8080/api/twitter/postTweet", {access_token_twitter, refresh_token_twitter});
        console.log(res.data);
    }

    const uploadFile = (e:any) => {
        e.preventDefault();
        setMedia(React.createElement("img", { src: URL.createObjectURL(e.target.files[0]), className:"tweetImgPreview"}));
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

            {/* --------------------------------- media upload ---------------------- */}
            <form className={`tweetPostImgUpload ${imgSelect=="twitterPostOptionSelected"?"":"displayNone"}`}>
                {media}
                <input type="file" name="resume" id="resume" onChange={e => uploadFile(e)} />
                <hr className="lightSeparator"/>
            </form>

            {/* --------------------------------- poll ---------------------- */}
            <div className={`tweetPostPoll ${pollSelect=="twitterPostOptionSelected"?"":"displayNone"}`}>
                <form>
                    <legend>Poll</legend>
                    <input type="text" placeholder="Choice 1" onChange={e => setChoice1(e.target.value)}/>
                    <input type="text" placeholder="Choice 2" onChange={e => setChoice2(e.target.value)}/>
                    <input type="text" placeholder="Choice 3 (optional)" onChange={e => setChoice3(e.target.value)}/>
                    <input type="text" placeholder="Choice 4 (optional)" onChange={e => setChoice4(e.target.value)}/>
                    <div>
                        <label>
                            Days <br/>
                            <input type="number" onChange={e => {pollLength["days"]=e.target.value}} name="days" id="days" min={0} max={7}/>
                        </label>
                        <label>
                            Hours <br/>
                            <input type="number" onChange={e => {pollLength["hours"]=e.target.value}} name="hours" id="hours" min={0} max={23}/>
                        </label>
                        <label>
                            Minutes <br/>
                            <input type="number" onChange={e => {pollLength["minutes"]=e.target.value}} name="minutes" id="minutes" min={0} max={59}/>
                        </label>
                    </div>


                </form>
                <hr className="lightSeparator"/>
            </div>

            <div className={"twitterPostOptions"}>
                <img src={imgIcon} className={imgSelect} onClick={ e => {
                    setImgSelect(imgSelect==""?"twitterPostOptionSelected":"");
                    setPollSelect("");
                }}/>
                <img src={pollIcon} className={pollSelect} onClick={ e => {
                    setImgSelect("");
                    setPollSelect(pollSelect==""?"twitterPostOptionSelected":"");
                }}/>
            </div>

            <input type="submit" value="Post a poll tweet" onClick={handlePost}/>
        </section>
    )
}