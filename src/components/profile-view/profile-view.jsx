import React, { useState, useEffect } from 'react';

export const ProfileView = () => {
    // store user data
    const [userData, setUserData] = useState(null);

    // fetches users JSON from API
    useEffect(() => {
        const users = 'https://myflixproject-9c1001b14e61.herokuapp.com/users';

        fetch(users, {
            method: 'GET',
            headers: {
                // Include any headers needed for authentication
                // For example, if using JWT token:
                // 'Authorization': `Bearer ${yourAuthToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    //catch
    if (!userData) {
        return <div>Loading...</div>;
    }

    // serves user profile
    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
        </div>
    );
};
