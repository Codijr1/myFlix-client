import React, { useState, useEffect } from 'react';

export const ProfileView = ({ user }) => {
    //debug
    // console.log('User Data', user);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        //debug
        console.log('Fetching user data');

        if (user) {
            //debug
            console.log('User present', user);
            console.log('User token', user.token);

            const profileUrl = `https://myflixproject-9c1001b14e61.herokuapp.com/users/${user.Username}`;

            fetch(profileUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then(response => {
                    //debug
                    console.log('undefined?', user.token);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setUserData(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.log('User missing, cannot fetch user data.');
            setUserData(null);
        }
    }, [user]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <>
                    <p>Username: {userData.Username}</p>
                    <p>Email: {userData.Email}</p>
                    {/* more info to come once this works */}
                </>
            ) : (
                <p>User data not available.</p>
            )}
        </div>
    );
};