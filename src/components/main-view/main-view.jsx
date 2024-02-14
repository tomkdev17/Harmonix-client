import {useState, useEffect} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";
import { LoginView } from '../login-view/login-view';

export const MainView = () => {

    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        if(!token){
            return;
        }

        fetch("https://harmonix-daebd0a88259.herokuapp.com/songs", {
            headers: {Authorization: `Bearer ${token}`}
        })
        // fetch("http://localhost:8080/songs")
        .then((response) => response.json())
        .then((data) => {
            console.log("Data from API: ", data);
            if(data) {
                const songFromAPI = data.map((songs) => {
                    return {
                        id: songs._id, 
                        title: songs.Title,
                        artist: songs.Artist,
                        genre: songs.Genre,
                        release: songs.Release,
                        image: songs.ImagePath  
                    };
                });
                setSongs(songFromAPI);        
            } else {
                console.error("Error: No songs data received from the API");
            }
        })
        .catch((err) => {
            console.error("Error fetching songs data: " + err);
        });
    }, [token]);

    if(!user) {    
        return(
            <LoginView 
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} 
            />
        ); 
    }
    
    if(selectedSong) {
        return(
            <SongView 
                songData = {selectedSong}
                onBackClick = {() => setSelectedSong(null)}
            />
        );
    }

    if(songs.length === 0) {
        return <div>The list is empty!</div>;
    }
    return(
        <div>
            {songs.map((song) => (
                <SongCard
                    key = {song.id}
                    songData = {song}
                    onSongClick = {(newSelectedSong) => {
                        setSelectedSong(newSelectedSong);
                    }}
                />
            ))}
        </div>
    );
};