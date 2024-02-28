import {useState, useEffect} from "react"; 
import { SongCard } from "../song-card/song-card";
import { SongView } from "../song-view/song-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {

    const [songs, setSongs] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser? storedUser: null);

    useEffect(() => {

        if(!user){
            return;
        }

        console.log(user);

        fetch("https://harmonix-daebd0a88259.herokuapp.com/songs", {
            headers: {Authorization: `Bearer ${user}`}
        })
        // fetch("http://localhost:8080/songs")
        .then((response) => response.json())
        .then((data) => {
            console.log("Data from API: ", data);
            if(data) {
                const songFromAPI = data.map((songs) => {
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

    return(
        <BrowserRouter>
            
            <NavigationBar 
                user={user}
                onLoggedOut={() => setUser(null)}
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
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => {setUser(user); }} />
                                    </Col>
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
                                        <SongView songs={songs} />
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
                                            <Col className="mb-4" key={song.id} md={3} > 
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