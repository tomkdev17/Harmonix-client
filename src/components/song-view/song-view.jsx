import { PropTypes } from "prop-types";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router"; 
import { Link } from "react-router-dom";


export const SongView = ({ user, userData, higherLevelFav, setHigherLevelFav, songs, Username}) => {

    const { songId } = useParams();
    const song = songs.find((s) => s.id === songId);
    const url = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}/songs/${songId}`;    

    const addFavorite = (event) => {
    
        // event.preventDefault();

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${user}`
            }
        }).then((response) => {
            console.log(response);
            if(response.ok) {
                // setIsFavorite(true);
                setHigherLevelFav(prevFav => [...prevFav, `${songId}`]);
                alert(`${song.title} has been added to your favorites list!`);
            } else {
                alert(`${song.title} could not be added to your favorites list :( `);
            }
        });
    };

    const removeFavorite = () => {

        fetch(url, {
            method: "DELETE", 
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${user}`
            }
        }).then((response) => {
            console.log(response);
            if(response.ok) {
                const updatedFavs = userData.Favorites.filter(song => song.id !== songId);
                setHigherLevelFav(updatedFavs);
                alert(`${song.title} has been removed from your favorites list!`);
            } else {
                alert(`${song.title} could not be removed from your favorites list :( `);
            }
        });
    };

    const handleFavoriteToggle = () => {

        if(higherLevelFav.includes(`${songId}`)) {
            removeFavorite();
        }
        else {
            addFavorite();
        }
    };

    return (
        <>
            <div className="text-center">
                <img className="w-50 h-50 img-thumbnail" src={song.image} alt={song.title}/>
            </div>
            <div className="text-center">
                <h1>{song.title}</h1>
                    <Button
                        variant={higherLevelFav.includes(`${songId}`) ? 'outline-primary' : 'primary'}
                        onClick={handleFavoriteToggle}
                    >
                        {higherLevelFav.includes(`${songId}`) ? 'Remove from favorites' : 'Add to favorites'}
                    </Button>
            </div>
            <Accordion defaultActiveKey={['0']} alwaysOpen flush className='mt-3 mb-3'>
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
            <Link to={'/'} className='d-grid gap-2'> 
                <Button className="back-button mb-5" size='lg' fluid='xs'> Back </Button>
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