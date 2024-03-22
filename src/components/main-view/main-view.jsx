import {useState, useEffect} from "react"; 
import { jwtDecode } from 'jwt-decode';
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from '../profile-view/profile-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {

    const [songs, setSongs] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    let Username;
    if(user && typeof user === 'string') {
        const decodedToken = jwtDecode(user);
        Username = decodedToken.Username;
    }
    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
    };
    const songsUrl = "https://harmonix-daebd0a88259.herokuapp.com/songs";
    const userUrl = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}`;

    useEffect(() => {

        if(!user){
            setIsLoading(false);
            return;
        };

        fetch(userUrl, {
            headers: {Authorization: `Bearer ${user}`}
        })
        .then((response) => response.json())
        .then((userData) => {

            if(userData) {
                setUserData(userData);
                setIsLoading(false);
            } else {
                console.error("Error: No user data received from the API");
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.error("Error fetching user data: " + err);
        });

        fetch(songsUrl, {
            headers: {Authorization: `Bearer ${user}`}
        })
        // fetch("http://localhost:8080/songs")
        .then((response) => response.json())
        .then((songsData) => {

            if(songsData) {
                const songFromAPI = songsData.map((songs) => {
                    return {
                        id: songs._id, 
                        title: songs.Title,
                        artist: songs.Artist,
                        genre: songs.Genre,
                        release: songs.Release,
                        image: songs.ImagePath  
                    };
                });
                setSongs(songFromAPI);        
            } else {
                console.error("Error: No songs data received from the API");
            }
        })
        .catch((err) => {
            console.error("Error fetching songs data: " + err);
        });
    }, [user]);



    if (isLoading) {
        return <div>Loading...</div>;
    };

    return(
        <BrowserRouter>
            
            <NavigationBar 
                user={user}
                onLoggedOut={handleLogout}
            />

            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col lg={5}>
                                        <LoginView onLoggedIn={(user) => {setUser(user); }} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path='/profile'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : (
                                    <ProfileView 
                                        user={user}
                                        userData={userData}
                                        Username={Username}
                                        songs={songs}
                                        onLoggedOut={handleLogout}
                                    />
                                )}
                            </>
                        }
                    />
                    <Route  
                        path="/songs/:songId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : songs.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8} > 
                                        <SongView 
                                            user={user} 
                                            userData={userData}
                                            songs={songs}   
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : songs.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <> 
                                        {songs.map((song) => (
                                            <Col className="mb-4" key={song.id} xs={12} sm={6} md={4} lg={3} > 
                                                <SongCard song={song} /> 
                                            </Col> 
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
        
    );
};