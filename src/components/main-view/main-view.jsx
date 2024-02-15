import {useState, useEffect} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";

export const MainView = () => {

    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        fetch("https://harmonix-daebd0a88259.herokuapp.com/songs")
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
    }, []);

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