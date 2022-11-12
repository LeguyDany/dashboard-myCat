
import React, {useState, useEffect, FormEvent} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../assets/components/TrackSearchResult";
import axios from "axios";

// @ts-ignore
export function SearchBarSpotify({playNow, addToWaitingList}){
    const tokenSpotify = localStorage.getItem("tokenSpotify") || undefined
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResults] = useState<any[]>([])

    const SpotifyApi = new SpotifyWebApi({
        clientId : "80db1bd3fc9845ad9a188627e68e774a",
        accessToken : tokenSpotify,
    })

    const searchSong = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!search) return setSearchResults([]);
        // @ts-ignore
        axios.post("http://localhost:8080/api/spotify/savesearch", {"LastSearch" : search})
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
    if(!tokenSpotify) return null

    return (
        <div>
            <form onSubmit={(e) => searchSong(e)}>
                <input type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)}/>
            </form>
            <div>
                {searchResult.map(track => (
                    <TrackSearchResult track = {track} key={track.uri} playNow={playNow} addToWaitingList={addToWaitingList}/>
                ))}
            </div>

        </div>
    )
}
