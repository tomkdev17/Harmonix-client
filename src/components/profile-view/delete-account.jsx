import React from 'react';
import Button from "react-bootstrap/Button";

export const DeleteAccount = ({url, onLoggedOut, user}) => {

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
        <>
            <h4>Delete My Account</h4>
                <p>Warning: This button cannot be unpressed, your account and all of its information will be removed from the Harmonix database</p>
                <Button variant="danger" onClick={handleDeregister} >Delete</Button>
        </>
    )
};