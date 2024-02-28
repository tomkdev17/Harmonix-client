import { PropTypes } from "prop-types";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export const SongCard = ({song}) => {
    return (
        <Card className="h-100 border border-4">
            <Card.Img variant="top" src={song.image} />
            <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Card.Text>{song.artist.Name}</Card.Text>
                <Link to={`/songs/${encodeURIComponent(song.id)}`} >
                    <Button variant="link">Read More</Button>
                </Link>
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