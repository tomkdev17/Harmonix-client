import {useState, useEffect} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {

    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser? storedUser: null);

    useEffect(() => {

        if(!user){
            return;
        }

        console.log(user);

        fetch("https://harmonix-daebd0a88259.herokuapp.com/songs", {
            headers: {Authorization: `Bearer ${user}`}
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
    }, [user]);

    if(!user) {    
        return(
            <div>
                <h3>Welcome to Harmonix! Please login: </h3>
                <LoginView 
                    onLoggedIn={(user) => {
                        setUser(user);
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
        return(
            <>
            <div>The list is empty!</div>
            <button onClick={() => { setUser(null); localStorage.clear(); }}>Logout</button>
            </>
        )
    }

    return(
        <Row>
            { !user ? (
                <>
                    <LoginView onLoggedIn={(user) => {
                        setUser(user);
                    }}
                    />
                    <SignupView /> 
                </>
            ) : selectedSong ? (
                <SongView
                    songData={selectedSong}
                    onBackClick = {() => setSelectedSong(null)}
                />  
            ) : songs.length === 0 ? (
                <div>The list is empty! :( </div>
            ) : (
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
                <button onClick={() => { setUser(null); localStorage.clear(); }}>Logout</button>
            </>
            )}
        </Row>
    );
};