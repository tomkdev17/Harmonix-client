import React, { useState, useEffect } from 'react';
import { SongCard } from '../song-card/song-card';
import { Container, Row, Col } from 'react-bootstrap';

export const FavoriteSongs = ({ userData, songs, higherLevelFav, setHigherLevelFav }) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        console.log('the state of higherLevelFav in FavoriteSongs is: ', higherLevelFav)
        const hashFavorites = () => {
            if(!userData || !userData.Favorites || !songs) {
                return;
            }

            const favoritesData = higherLevelFav.map(songId => {
                return songs.find(s => s.id === songId);
            });
            const filteredFavs = favoritesData.filter(song => !!song);

            setFavorites(filteredFavs);
            console.log('Fetched songs data: ', favoritesData);
            console.log('Favorites: ', favorites);
            console.log('New Favorites state : ', higherLevelFav);
        };

        hashFavorites();
    }, [userData, songs]);

    return(
        <Container>
            <Row>
                <Col xs={12}>
                    <h3>Favorites:</h3>
                </Col>
            </Row>
            <Row>   
                {favorites.map(song => (
                    <Col xs={12} sm={6} md={4} lg={3} key='favorites.id'>
                        <SongCard song={song} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};