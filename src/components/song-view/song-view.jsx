import { PropTypes } from "prop-types";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

export const SongView = ({songData, onBackClick}) => {
    return (
        <>
            <img className="w-100" src={songData.image} alt={songData.title}/>
            <div>
                <h1>{songData.title}</h1>
            </div>
            <Accordion defaultActiveKey={['0']} alwaysOpen flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Artist : {songData.artist.Name}</Accordion.Header>
                    <Accordion.Body>
                        {songData.artist.Bio}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Genre : {songData.genre.Name}</Accordion.Header>
                    <Accordion.Body>
                        {songData.genre.Description}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
                <Button onClick={onBackClick}>Back</Button>
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