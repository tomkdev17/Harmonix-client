import { PropTypes } from "prop-types";

export const SongCard = ({songData, onSongClick}) => {
    return (
        <div
            onClick ={() => {
                onSongClick(songData);
            }}
        >
            {songData.title}
        </div>
    );
};

SongCard.propTypes = {
    songData: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string.isRequired,  
        artist: PropTypes.shape({
            Name: PropTypes.string.isRequired, 
            Bio: PropTypes.string.isRequired
        }), 
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    })
    
}