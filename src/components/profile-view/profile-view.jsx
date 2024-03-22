import React, { useEffect } from 'react';
import { UserInfo } from "./user-info";
import {Container, Row, Col, Card} from 'react-bootstrap';
import { FavoriteSongs } from './favorite-songs';
import { UpdateUser } from './update-user';
import { DeleteAccount } from './delete-account';

export const ProfileView = ({user, userData, Username, songs, onLoggedOut, higherLevelFav, setHigherLevelFav}) => {
    
    const url = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}`;

    useEffect(() => {
        if (userData && userData.Favorites) {
            userData.Favorites.map(songId => {
                return songs.find(s => s.id === songId);
            });
        }
    })

    const handleDeregister = () => {

        fetch(url, {
            method: "DELETE", 
            headers: { Authorization: `Bearer ${user}`}
        }).then((response) => {
            console.log(response);
            if(response.ok) {
                alert("Account has been successfully deregistered");
                onLoggedOut();
                window.location.reload();
            } else {
                alert("Deregistration has failed");
            }
        })
        .catch((err) => {
            console.error("Error deregistering account" + err);
        });
    };

    return(
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card className='bg-primary'>
                        <Card.Body>
                            <UserInfo Username={Username} userData={userData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
                    <Card className='bg-primary'>
                        <Card.Body>
                            <UpdateUser url={url} user={user}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='mb-5'>
                    <FavoriteSongs
                         userData={userData} 
                         songs={songs} 
                         higherLevelFav={higherLevelFav}
                         setHigherLevelFav={setHigherLevelFav}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={6} className='mx-auto text-center mb-5'>
                    <Card>
                        <Card.Body>
                            <DeleteAccount handleDeregister={handleDeregister} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>    
        </Container>
    );
};
        
        
