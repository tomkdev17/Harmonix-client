import {useState} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";

export const MainView = () => {
    const [songs, setSongs] = useState([
        {
            id: 1, 
            title: "Cure", 
            artist: "Moonchild", 
            image: "https://f4.bcbits.com/img/a1715825296_10.jpg"
        },
        {
            id: 2, 
            title: "Roots Bloody Roots", 
            artist: "Sepultura", 
            image: "https://upload.wikimedia.org/wikipedia/en/c/cf/Sepultura_-_Roots.jpg"
        },
        {
            id: 3, 
            title: "Cough Syrup", 
            artist: "Young the Giant", 
            image: "https://i.scdn.co/image/ab67616d0000b273e0e1939607a3854a59433f5f"
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