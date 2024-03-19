import React from 'react';
import Button from "react-bootstrap/Button";

export const DeleteAccount = ({handleDeregister}) => {
    return(
        <>
            <h4>Delete My Account</h4>
                <p>Warning: This button cannot be unpressed, your account and all of its information will be removed from the Harmonix database</p>
                <Button variant="danger" onClick={handleDeregister} >Delete</Button>
        </>
    )
};