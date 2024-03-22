import { useState, useEffect } from 'react';
import { PropTypes } from "prop-types";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router"; 
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const SongView = ({ user, userData, songs, higherLevelFav, setHigherLevelFav, updateHigherLevelFav}) => {

    const { songId } = useParams();
    const song = songs.find((s) => s.id === songId);
    const decodedToken = jwtDecode(user);
    const Username = decodedToken.Username;
    const url = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}/songs/${songId}`;
    const [isFavorite, setIsFavorite] = useState(false);
    
    useEffect(() => {
        
        if(!userData){
            return;
        }
        
        const existingFavorite = userData.Favorites.includes(songId);
        setIsFavorite(existingFavorite);


        const updatedHigherLevelFav = existingFavorite ? [...higherLevelFav, songId] : higherLevelFav.filter(id => id !== songId);
        setHigherLevelFav(updatedHigherLevelFav);
        console.log('the current state of higherLevelFav is: ', higherLevelFav);

    }, [userData]);

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
                alert(`${song.title} has been added to your favorites list!`);
                setIsFavorite(true);
                setHigherLevelFav(`${songId}`);
                updateHigherLevelFav(`${songId}`);
            } else {
                alert(`${song.title} could not be added to your favorites list :( `);
            }
        });
    };

    const removeFavorite = (event) => {
        
        // event.preventDefault();

        fetch(url, {
            method: "DELETE", 
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${user}`
            }
        }).then((response) => {
            console.log(response);
            if(response.ok) {
                alert(`${song.title} has been removed from your favorites list!`);
                setIsFavorite(false);
                const updatedFav = higherLevelFav.filter(song => song.id !== `${songId}`);
                setHigherLevelFav(updatedFav);
                console.log(higherLevelFav);
            } else {
                alert(`${song.title} could not be removed from your favorites list :( `);
            }
        });
    };

    const handleFavoriteToggle = () => {
        if(isFavorite) {
            // && higherLevelFav.some(song => song.id === `${songId}`)  this is how we'd handle it without isFavorite....? 
            removeFavorite();
            console.log(higherLevelFav);
        }
        else {
            addFavorite();
            console.log(higherLevelFav);
        }
        // if(!isFavorite && higherLevelFav) {
        //     addFavorite();
        // }
    };

    return (
        <>
            <img className="w-100" src={song.image} alt={song.title}/>
            <div>
                <h1>{song.title}</h1>
                <Button 
                variant={isFavorite ? 'outline-primary' : 'primary'}
                onClick={handleFavoriteToggle} 
                >
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
                <Button className="back-button mb-5" size='lg' fluid> Back </Button>
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