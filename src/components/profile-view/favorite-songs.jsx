import React, { useState, useEffect } from 'react';
import { SongCard } from '../song-card/song-card';
import { Container, Row, Col } from 'react-bootstrap';

export const FavoriteSongs = ({songs, higherLevelFav}) => {

    const favoritesData = higherLevelFav.map(songId => {
        return songs.find(s => s.id === songId);
    });
    const filteredFavs = favoritesData.filter(song => !!song);

    return(
        <Container>
            <Row>
                <Col xs={12}>
                    <h3>Favorites:</h3>
                </Col>
            </Row>
            <Row>
                {filteredFavs.length === 0 ? (
                    <Col>
                        <p>You haven't added any favorites to your list yet!</p>
                    </Col>
                ) : (
                    filteredFavs.map((song, index) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={index}>
                            <SongCard song={song} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};