import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ProfileView = ({user, onLoggedOut}) => {
    
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    console.log(user);
    const decodedToken = jwtDecode(user);
    const Username = decodedToken.Username;
    console.log(Username);
    const url = `https://harmonix-daebd0a88259.herokuapp.com/users/${Username}`;
    
    useEffect(() => {
        
        if(!user){
            setIsLoading(false);
            return;
        };

        fetch(url, {
            headers: {Authorization: `Bearer ${user}`}
        })
        .then((response) => response.json())
        .then((data) => {

            if(data) {
                console.log("User data from API: ", data);
                setUserData(data);        
                setIsLoading(false);
            } else {
                console.error("Error: No user data received from the API");
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.error("Error fetching user data: " + err);
        });
    }, [user]);

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
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <>
            {userData && (
                <div>
                    <h3>User Profile:</h3> 
                        <p>Username: {userData.Username}</p>
                        <p>Email: {userData.Email}</p>
                        <p>Birthday: {userData.Birthday}</p>
                        <p>Favorites: {userData.Favorites}</p>
                </div>
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
