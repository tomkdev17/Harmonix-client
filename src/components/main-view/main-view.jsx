import {useState, useEffect} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {

    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);

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
            <div>
                <LoginView 
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} 
                />
                <h3>Or Create an Account: </h3>
                <SignupView/>
            </div>
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
        <>
            {songs.map((song) => (
                <SongCard
                    key = {song.id}
                    songData = {song}
                    onSongClick = {(newSelectedSong) => {
                        setSelectedSong(newSelectedSong);
                    }}
                />
            ))}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
    );
};