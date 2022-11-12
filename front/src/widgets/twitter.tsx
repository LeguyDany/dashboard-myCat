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
    pollLength: pollLength | undefined
}


// ------------------------------------- Child -------------------------------------


// ------------------------------------- Main component -------------------------------------
export function PostTweet(){
    /* Allows the connected user to post a tweet. */
    const access_token_twitter = localStorage.getItem("access_token_twitter");
    const refresh_token_twitter = localStorage.getItem("refresh_token_twitter");
    const [urlProfile, setUrlProfile] = useState<string>();
    const [media, setMedia] = useState<any>();
    const [text, setText] = useState<string>("");
    const [reply_settings, setReplySettings] = useState<String>();
    const [imgSelect, setImgSelect] = useState<string>("");
    const [pollSelect, setPollSelect] = useState<string>("");
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [pollLength, setPollLength] = useState<pollLength>({days:"0", hours:"0", minutes:"0"});


    const clearPoll = () => {
        setPollSelect("");
        setChoice1("");
        setChoice2("");
        setChoice3("");
        setChoice4("");
        setPollLength({days:"0", hours:"0", minutes:"0"});
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

    const uploadFile = (e:any) => {
        e.preventDefault();
        setMedia(React.createElement("img", { src: URL.createObjectURL(e.target.files[0]), className:"tweetImgPreview"}));
    }

    const handleImgOption = () => {
        switch(imgSelect){
            case "":
                setImgSelect("twitterPostOptionSelected");
                break;
            case "twitterPostOptionSelected":
                setImgSelect("");
                // @ts-ignore
                document.querySelector('#media').value = null;
                break;
        }
        clearPoll();
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
        // @ts-ignore
        document.querySelector('#media').value = null;
        setImgSelect("");
        setMedia(null);
    }

    const postForm = async () => {
        let formData = new FormData();

        const imageFile:any = document.querySelector('#media');
        formData.append("media", imageFile.files[0]);

        const data:formDataTweet = {
            text: text,
            choice1: choice1,
            choice2: choice2,
            choice3: choice3,
            choice4: choice4,
            pollLength: pollLength
        }

        for(const item in data){
            // @ts-ignore
            formData.append(item, data[item]);
        }

        try {
            const res = await axios.post("http://localhost:8080/api/twitter/postTweet", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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

            {/* --------------------------------- media upload ---------------------- */}
            <form className={`tweetPostImgUpload ${imgSelect=="twitterPostOptionSelected"?"":"displayNone"}`}>
                {media}
                <input type="file" name="media" id="media" onChange={e => uploadFile(e)} />
                <hr className="lightSeparator"/>
            </form>

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
                                <input type="number" onChange={e => {pollLength["days"]=e.target.value}} name="days" id="days" min={0} max={7}/>
                            </label>
                            <label>
                                <p>Hours</p>
                                <input type="number" onChange={e => {pollLength["hours"]=e.target.value}} name="hours" id="hours" min={0} max={23}/>
                            </label>
                            <label>
                                <p>Minutes</p>
                                <input type="number" onChange={e => {pollLength["minutes"]=e.target.value}} name="minutes" id="minutes" min={0} max={59}/>
                            </label>
                        </div>
                    </div>


                </form>
                <hr className="lightSeparator"/>
            </div>

            <div className={"twitterPostOptions"}>
                <img src={imgIcon} className={imgSelect} onClick={handleImgOption}/>
                <img src={pollIcon} className={pollSelect} onClick={handlePollOption}/>
            </div>

            <input type="submit" value="Post a poll tweet" onClick={postForm}/>
        </section>
    )
}