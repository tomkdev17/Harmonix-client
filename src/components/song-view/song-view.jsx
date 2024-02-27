import { PropTypes } from "prop-types";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router"; 
import { Link } from "react-router-dom";

export const SongView = ({songData}) => {

    const { songId } = useParams();

    const song = songData.find((s) => s.id === songId);

    return (
        <>
            <img className="w-100" src={song.image} alt={song.title}/>
            <div>
                <h1>{song.title}</h1>
            </div>
            <Accordion defaultActiveKey={['0']} alwaysOpen flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Artist : {song.artist.Name}</Accordion.Header>
                    <Accordion.Body>
                        {song.artist.Bio}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Genre : {song.genre.Name}</Accordion.Header>
                    <Accordion.Body>
                        {song.genre.Description}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Link to={'/'} > 
                <Button className="back-button"> Back </Button>
            </Link>
        </>
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