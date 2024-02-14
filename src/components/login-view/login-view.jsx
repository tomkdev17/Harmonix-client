import {useState} from "react"; 

export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        
        event.preventDefault();

        const data = {
            access: username,
            secret: password
        };

        fetch("https://harmonix-daebd0a88259.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type":"aplication/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login Response: ", data);
                if(data.user){
                    onLoggedIn(data.user, data.token);
                }else {
                    alert("Login Failed: no such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });   
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password: 
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>    
    );
};