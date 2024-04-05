import { PropTypes } from "prop-types";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export const SongCard = ({song}) => {
    
    return (
        <Card className="h-100 border border-4">
            <Link to={`/songs/${encodeURIComponent(song.id)}`} >
                <Card.Img variant="top" src={song.image} />
            </Link>
            <Card.Body>
                <Card.Title className="text-sm-lg">{song.title}</Card.Title>
                <Card.Text>{song.artist.Name}</Card.Text>
                <Link to={`/songs/${encodeURIComponent(song.id)}`} >
                    <Button className="btn btn-primary" variant="link">Info</Button>
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