import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SongCard } from "../song-card/song-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileView = ({user, userData, Username, songs, onLoggedOut}) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favorites, setFavorites] = useState([]);
    const url = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}`;
    console.log({songs});

    // useEffect(() => {

    //     if(!userData || !userData.Favorites) {
    //         return;
    //     }
    //     const fetchFavorites = async () => {
    //         const songsPromises = userData.Favorites.map(songId =>
    //             fetch(`https://harmonix-daebd0a88259.herokuapp.com/songs/${songId}`, {
    //                 headers: {Authorization: `Bearer ${user}`}
    //             })
    //             .then(response => response.json())
    //             .catch(err => console.error(`Error fetching favorite id= ${songId}`, err))
    //         );

    //         const favoritesData = await Promise.all(songsPromises);
    //         setFavorites(favoritesData.filter(song => !!song));
    //         console.log('Fetched songs data: ', favoritesData);
    //     };
    //     fetchFavorites();
    // }, [userData]);
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
    
    const handleUpdate = (event) => {

        event.preventDefault();
        
        const data = {    
            Username: username, 
            Password: password, 
            Email: email, 
            Birthday: birthday
        };

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${user}`,
                "Content-type": "application/json"
            }
        }).then((response) => {
            console.log(response);

            if(response.ok) {
                alert("Update Successful!");
                window.location.reload();
            } else {
                alert("Update Failed :(");
            }
        });
    };

    const handleDeregister = (event) => {

        event.preventDefault();

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
        <>
            {userData && (
                <Row>
                    <h1>{Username}'s Profile:</h1> 
                        <p>Email: {userData.Email}</p>
                        <p>Birthday: {userData.Birthday}</p>                
                            <p>Favorites:</p>
                        {favorites.map(song => (
                            <Col className='mb-4' key='favorites.id' md={3}>
                                <SongCard song={song} />
                            </Col>
                        ))}
                </Row>
            )}
                <div>
                    <h3>Update User Info:</h3>
                    <Form onSubmit={handleUpdate} >
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email: </Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday: </Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            /> 
                        </Form.Group>

                        <Button variant="primary" className="btn-sm" type="submit">
                            Update my info
                        </Button>
                    </Form> 
                </div>
                <div>
                    <h4>Deregister My Account</h4>
                        <p>Warning: This button cannot be unpressed, your account and all of its information will be removed from the Harmonix database</p>
                        <Button variant="danger" onClick={handleDeregister} >Deregister</Button>
                </div>
        </>
    );
};
        
            

// export const ProfileView = ({user}) => {
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('https://harmonix-daebd0a88259.herokuapp.com/users'); 
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }
//         const data = await response.json();
//         setUserData(data);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {userData && (
//         <div>
//           <h2>User Profile</h2>
//           <p>Name: {userData.name}</p>
//           <p>Email: {userData.email}</p>
//           {/* Add more user information as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileView;
