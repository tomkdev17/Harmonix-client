import {useState} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";

export const MainView = () => {
    const [songs, setSongs] = useState([
        {
            id: 1, 
            title: "Cure", 
            artist: "Moonchild", 
            image: ""
        },
        {
            id: 2, 
            title: "Roots Bloody Roots", 
            artist: "Sepultura", 
            image: ""
        },
        {
            id: 3, 
            title: "Cough Syrup", 
            artist: "Young the Giant", 
            image: ""
        }
    ]);


const [selectedSong, setSelectedSong] = useState(null);

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