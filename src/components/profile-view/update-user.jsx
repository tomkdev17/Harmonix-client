import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateUser = ({url, user}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

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

    return(
        <>
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
        </>
    );
};