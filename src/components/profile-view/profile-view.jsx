import React, { useEffect } from 'react';
import { UserInfo } from "./user-info";
import {Container, Row, Col, Card} from 'react-bootstrap';
import { FavoriteSongs } from './favorite-songs';
import { UpdateUser } from './update-user';
import { DeleteAccount } from './delete-account';

export const ProfileView = ({user, userData, Username, songs, onLoggedOut, higherLevelFav}) => {
    
    const url = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}`;

    return(
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card className='bg-secondary'>
                        <Card.Body>
                            <UserInfo Username={Username} userData={userData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
                    <Card className='bg-secondary'>
                        <Card.Body>
                            <UpdateUser url={url} user={user}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='mt-5 mb-5'>
                    <FavoriteSongs
                         songs={songs} 
                         higherLevelFav={higherLevelFav}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={6} className='mx-auto text-center mb-5'>
                    <Card className="bg-secondary">
                        <Card.Body>
                            <DeleteAccount 
                                url={url} 
                                onLoggedOut={onLoggedOut}
                                user={user}    
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>    
        </Container>
    );
};
        
        
