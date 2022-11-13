// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, {DetailedHTMLProps, ImgHTMLAttributes, useEffect, useState} from 'react';
import axios from 'axios';
import './twitter.css';


// ------------------------------------- Images / svg -------------------------------------
import twitterIcon from '../assets/icons/twitterIcon.svg';
import imgIcon from '../assets/icons/image-line.svg';
import pollIcon from '../assets/icons/chat-poll-line.svg';
import verifiedIcon from '../assets/icons/Twitter_Verified_Badge.svg'
import hashtagIcon from '../assets/icons/hashtagIcon.svg'


// ============================================= Components =============================================
// ------------------------------------- Interfaces -------------------------------------
interface titleType{
    title:string;
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
    reply_settings : string,
}
interface hashtagTweet{
    userName: string;
    profilePic: string;
    screenName: string;
    createdAt: string;
    text: string;
    mentionedUsers: string[] | null | undefined;
    hashtags: string[] | null | undefined;
}
interface userInfo{
    screen_name:string|undefined;
    created_at:string|undefined;
    followers_count:number|undefined;
    friends_count:number|undefined;
    profile_banner_url:string|undefined;
    verified:boolean|undefined;
    name:string|undefined;
    profile_image_url:string|undefined;
    description: string|undefined;
}

// ------------------------------------- Children -------------------------------------
// -------------- General --------------
function CompHead({title}:titleType){
    return(
        <div className="compHead">
            <div>
                <img src={twitterIcon}/>
                <h1>Twitter - {title}</h1>
            </div>
            <hr/>
        </div>
    )
}

// -------------- GetTweetByHashtag --------------
function SetupTweetsHashtag({arrayTweets}:any){
    const [images, setImages] = useState<string[]>();

    const checkImage = (toCheck:any) => {
        let imageArray = [];

        if(toCheck.extended_entities !== undefined){
            for(const item in toCheck.extended_entities.media){
                imageArray.push(React.createElement("img", {key:toCheck.extended_entities.media[item] + "image", src:toCheck.extended_entities.media[item].media_url, alt:"Image file", className:"imgTweetHashtag"}));
            }
        }
        return imageArray;
    }


    return(
        <>
            {arrayTweets.map((tweet:any, index:KeyType) => (
                <>
                    <HashtagTweet userName={tweet.user.name}
                                  profilePic={tweet.user.profile_image_url}
                                  screenName={tweet.user.screen_name}
                                  createdAt={tweet.created_at}
                                  text={tweet.text}
                                  mentionedUsers={tweet.entities.user_mentions}
                                  hashtags={tweet.entities.hashtags}
                                  key={index}
                    />
                    {checkImage(tweet)}
                </>
            ))}
        </>
    )
}
function HashtagTweet({userName, profilePic, screenName, createdAt, text, mentionedUsers, hashtags}:hashtagTweet){

    return(
        <article className="singleTweetByHashtag">
            <hr className="lightSeparator"/>
            <div>
                <img src={profilePic} alt="Profile picture"/>
                <p>
                    <span className="tweetsHashtagUserName">{userName}</span> <br/>
                    <span className="tweetsHashtagScreenName">@{screenName}</span> {createdAt.slice(4,16)} {createdAt.slice(26)}
                </p>
            </div>
            <p>
                {text}
            </p>

        </article>
    )
}

// -------------- GetUserInfo --------------
function DisplayUser({screen_name, created_at, followers_count, friends_count, profile_banner_url, verified, name, profile_image_url, description}:userInfo){
    return(
        <article className={`${screen_name !== undefined ? "" : "displayNone"}`}>
            <hr className="lightSeparator"/>
            <img src={profile_banner_url} alt="banner picture" className={`userBanner ${profile_banner_url !== undefined?"":"displayNone"}`}/>
            <div className="profileHead">
                <img src={profile_image_url} alt="profile picture" className={`profilePic ${profile_image_url !== undefined?"":"displayNone"}`}/>
                <p>
                    <div>
                        <span className="tweetsHashtagUserName">{name}</span>
                        <img src={verifiedIcon} alt="verified icon" className={`verifiedIcon ${verified !== undefined || verified !== false?"displayNone":""}`}/>
                    </div>
                    <div>
                        <span className="tweetsHashtagScreenName">@{screen_name}</span> <span className="userCreationDate">Created at: {created_at?.slice(4,10)} {created_at?.slice(26)}</span>
                    </div>

                </p>
            </div>

            <div className="userMetrics">
                <span>{followers_count}</span> followers <br/>
                <span>{friends_count}</span> following
            </div>

            <p>
                {description}
            </p>

        </article>
    )
}

// ------------------------------------- Main component -------------------------------------
export function PostTweet(){
    /* Allows the connected user to post a tweet. */
    const access_token_twitter = localStorage.getItem("access_token_twitter");
    const refresh_token_twitter = localStorage.getItem("refresh_token_twitter");
    const [urlProfile, setUrlProfile] = useState<string>();
    const [text, setText] = useState<string>("everyone");
    const [reply_settings, setReplySettings] = useState<string>("");
    const [pollSelect, setPollSelect] = useState<string>("");
    const [choice1, setChoice1] = useState<string>("");
    const [choice2, setChoice2] = useState<string>("");
    const [choice3, setChoice3] = useState<string>("");
    const [choice4, setChoice4] = useState<string>("");
    const [days, setDays] = useState<string>("0");
    const [hours, setHours] = useState<string>("0");
    const [minutes, setMinutes] = useState<string>("0");
    const [successPost, setSuccessPost] = useState<any>();

    const clearPoll = () => {
        setPollSelect("");
        setSuccessPost("");
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
            reply_settings : reply_settings,
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
            setSuccessPost(React.createElement("p", {className:"postSuccess"}, "Tweet posted!"))
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
            <CompHead title="Post a Tweet"/>

            <div>
                <img src={urlProfile} alt="Profile picture"/>
                <select onChange={e => setReplySettings(e.target.value)}>
                    <option value="everyone">Everyone can answer</option>
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

            {successPost}

            <input type="submit" value="Post a poll tweet" onClick={postForm}/>
        </section>
    )
}

export function GetTweetByHashtag(){
    const [hashtag, setHashtag] = useState<string>("");
    const [tweets, setTweets] = useState<[]>([]);
    const [submit, setSubmit] = useState<boolean>(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setSubmit(prevState => !prevState);
        const res = await axios.post("http://localhost:8080/api/twitter/getByHashtag", {hashtag});
        setTweets(res.data.statuses);
    }

    useEffect(() => {
        if(hashtag !== ""){
            const timer = setInterval( async () => {
                const res = await axios.post("http://localhost:8080/api/twitter/getByHashtag", {hashtag});
                setTweets(res.data.statuses);
            }, 15*1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [submit])

    return(
        <section className="getTweetByHashtag">
            <CompHead title="Tweets by #"/>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={e => setHashtag(e.target.value)}/>
                <input type="submit" value="Search"/>
            </form>

            <SetupTweetsHashtag arrayTweets={tweets}/>

        </section>
    )
}

export function GetTwitterUser(){
    const [screenName, setScreenName] = useState<string>();
    const [userInfo, setUserInfo] = useState<userInfo>();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:8080/api/twitter/getUserInfo", {screen_name : screenName});
        setUserInfo({
            screen_name:res.data.screen_name,
            created_at:res.data.created_at,
            followers_count:res.data.followers_count,
            friends_count:res.data.friends_count,
            profile_banner_url:res.data.profile_banner_url,
            verified:res.data.verified,
            name:res.data.name,
            profile_image_url:res.data.profile_image_url,
            description: res.data.description,
        })
    }

    return(
        <section className="getTwitterUser">
            <CompHead title="Get user info"/>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={e => setScreenName(e.target.value)} placeholder="Insert user screen name"/>
                <input type="submit" value="Search"/>
            </form>
            <DisplayUser screen_name={userInfo?.screen_name}
                         created_at={userInfo?.created_at}
                         followers_count={userInfo?.followers_count}
                         friends_count={userInfo?.friends_count}
                         profile_banner_url={userInfo?.profile_banner_url}
                         verified={userInfo?.verified}
                         name={userInfo?.name}
                         profile_image_url={userInfo?.profile_image_url}
                         description={userInfo?.description}
            />
        </section>
    )
}