import React from 'react';

export const UserInfo = ({Username, userData}) => {
    return (
        <>
                    <h3>{Username}'s Profile:</h3> 
                        <p>Name: {userData.Username}</p>
                        <p>Email: {userData.Email}</p>
                        <p>Birthday: {userData.Birthday}</p>                
        </>
    );
};
