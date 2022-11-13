
import React, {useState, useEffect, FormEvent} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../assets/components/TrackSearchResult";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

// @ts-ignore
export function SearchBarSpotify({playNow, addToWaitingList, autoPlay}){
    const tokenSpotify = localStorage.getItem("tokenSpotify") || undefined
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResults] = useState<any[]>([])
    const [userInfo, setUserInfo] = useState(localStorage.getItem("user-info") || undefined)

    const SpotifyApi = new SpotifyWebApi({
        clientId : "80db1bd3fc9845ad9a188627e68e774a",
        accessToken : tokenSpotify,
    })

    const searchSong = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!search) return setSearchResults([]);
        if(userInfo) {
            // @ts-ignore
            axios.post("http://localhost:8080/api/spotify/savesearch",{"LastSearch" : search}, {
                headers: {
                    authorization: `Bearer ${userInfo}`
                }
            })
        }
        SpotifyApi.searchTracks(search).then( res => {
            // @ts-ignore
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) =>{
                        // @ts-ignore
                        if(image.height < smallest.height) return image
                        return smallest
                    },
                    track.album.images[0])
                return{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri : track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
    }
    function fetchData (){

    }
    useEffect(() =>{
        (async () => {
            const res = await axios.get("http://localhost:8080/api/spotify/getlastresearch", {
                headers: {
                    authorization: `Bearer ${userInfo}`
                }})
            await setSearch(res.data)
            SpotifyApi.searchTracks(res.data).then( res => {
                // @ts-ignore
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) =>{
                            // @ts-ignore
                            if(image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0])
                    return{
                        artist: track.artists[0].name,
                        title: track.name,
                        uri : track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
            })

        })();
    }, [])

    if(!tokenSpotify) return null


    return (
        <div>
            <form onSubmit={(e) => searchSong(e)}>
                <input type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)}/>
            </form>
            <div>
                {searchResult.map(track => (
                    <TrackSearchResult track = {track} key={track.uri} autoPlay = {autoPlay} playNow={playNow} addToWaitingList={addToWaitingList}/>
                ))}
            </div>

        </div>
    )
}
