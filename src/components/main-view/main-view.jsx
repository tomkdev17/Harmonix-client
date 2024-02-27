import {useState, useEffect} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

    return(
        <Row className="justify-content-md-center">
            { !user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user) => {
                        setUser(user);
                    }}
                    />
                    <SignupView /> 
                </Col>
            ) : selectedSong ? (
                <Col md={8}>
                    <SongView
                        songData={selectedSong}
                        onBackClick = {() => setSelectedSong(null)}
                    />
                </Col>
                  
            ) : songs.length === 0 ? (
                <div>The list is empty! :( </div>
            ) : (
            <>
                {songs.map((song) => (
                    <Col className="mb-5" key={song.id} md={3} >
                        <SongCard
                            songData = {song}
                            onSongClick = {(newSelectedSong) => {
                                setSelectedSong(newSelectedSong);
                            }}
                        />
                    </Col>
                ))}
                <Button  variant="primary" className="w-75" onClick={() => { setUser(null); localStorage.clear(); }}>Logout</Button>
            </>
            )}
        </Row>
    );
};