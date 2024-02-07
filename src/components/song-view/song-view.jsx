import { PropTypes } from "prop-types";

export const SongView = ({songData, onBackClick}) => {
    return (
        <div>
            <img src={songData.image} alt={songData.title}/>
            <div>
                <span>Title: </span>
                <span>{songData.title}</span>       
            </div>
            <div>
                <span>Artist: </span>
                <span>{songData.artist.Name}</span>
                <div>
                    <span>Artist Bio: </span>
                    <span>{songData.artist.Bio}</span>
                </div>
            </div>
            
            <div>
                <span>Genre: </span>
                <span>{songData.genre.Name}</span>
                <div>
                    <span>Genre Description: </span>
                    <span>{songData.genre.Description}</span>
                </div>
            </div>
                <button onClick={onBackClick}>Back</button>
        </div>
    )
}

SongView.propTypes = {
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