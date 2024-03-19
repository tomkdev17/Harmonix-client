import React, { useState, useEffect } from 'react';
import { SongCard } from '../song-card/song-card';
import { Container, Row, Col } from 'react-bootstrap';

export const FavoriteSongs = ({ userData, songs}) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const hashFavorites = () => {
            if(!userData || !userData.Favorites || !songs) {
                return;
            }
            const favoritesData = userData.Favorites.map(songId => {
                return songs.find(s => s.id === songId);
            });
            setFavorites(favoritesData.filter(song => !!song));
            console.log('Fetched songs data: ', favoritesData);
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