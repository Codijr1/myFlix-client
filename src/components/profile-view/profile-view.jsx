import React, { useState, useEffect } from 'react';

export const ProfileView = ({ user }) => {
    //debug
    // console.log('User Data', user);
    const [userData, setUserData] = useState(null);

    useEffect(() => {        //debug
        console.log('Fetching user data');
        if (user) {
            //debug
            console.log('User present', user);
            const profileUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com/users/';
            fetch(profileUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    //debug
                    console.log('Received user data from server:', data);
                    const loggedInUserId = user._id;
                    const loggedInUser = data.find(user => user._id === loggedInUserId);

                    if (loggedInUser) {
                        setUserData(loggedInUser);
                    } else {
                        console.error('Logged-in user data not found in the array.');
                        setUserData(null);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
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
                    {userData.favoriteMovies.length > 0 ? (
                        <ul>
                            {userData.favoriteMovies.map(movie => (
                                <li key={movie._id}>{movie.Title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorite movies available.</p>
                    )}
                    {/* more info to come once this works */}
                </>
            ) : (
                <p>User data not available.</p>
            )}
        </div>
    );
};