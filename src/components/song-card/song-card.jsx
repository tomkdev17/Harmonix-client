import { PropTypes } from "prop-types";
import {Button, Card} from "react-bootstrap";

export const SongCard = ({songData, onSongClick}) => {
    return (
        <Card className="h-100 border border-4">
            <Card.Img variant="top" src={songData.image} />
            <Card.Body>
                <Card.Title>{songData.title}</Card.Title>
                <Card.Text>{songData.artist.Name}</Card.Text>
                <Button onClick ={() => onSongClick(songData)}>
                    Browse
                </Button>
            </Card.Body>
        </Card>
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