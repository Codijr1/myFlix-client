import React, { useState, useEffect } from 'react';

export const ProfileView = ({ user, token }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user && token) {
            const profileUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com/users/';
            fetch(profileUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then(response => {
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
        }
    }, [user, token]);

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
                    {userData.favoriteMovies?.length > 0 ? (
                        <ul>
                            {userData.favoriteMovies.map(movie => (
                                <li key={movie._id}>{movie.Title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No favorite movies available.</p>
                    )}
                </>
            ) : (
                <p>User data not available.</p>
            )}
        </div>
    );
};