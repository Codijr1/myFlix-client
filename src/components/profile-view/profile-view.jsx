import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProfileView = ({ user, token }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user && token) {
            const profileUrl = `https://myflixproject-9c1001b14e61.herokuapp.com/users/${user.Username}`;
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

    const handleDeleteFromFavorites = async (movieId) => {
        try {
            const response = await fetch(`https://myflixproject-9c1001b14e61.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const updatedUserData = await response.json();
                setUserData(updatedUserData);
                toast.success('Movie removed from favorites');
            } else {
                console.error('Error deleting movie from favorites:', response.statusText);
                toast.error('Error removing movie from favorites');
            }
        } catch (error) {
            console.error('Error deleting movie from favorites:', error);
            toast.error('Error removing movie from favorites');
        }
    };


    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <>
                    <p>Username: {userData.Username}</p>
                    <p>Email: {userData.Email}</p>

                    {userData.favoriteMovies?.length > 0 ? (

                        <Row>
                            {userData.favoriteMovies?.length > 0 ? (
                                <Row>
                                    {userData.favoriteMovies.map(movieId => (
                                        <Col key={movieId} md={6}>
                                            <p>Movie ID: {movieId}</p>
                                            <Button variant="danger" onClick={() => handleDeleteFromFavorites(movieId)}>Remove</Button>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No favorite movies available.</p>
                            )}
                        </Row>
                    ) : (
                        <p>No favorite movies available.</p>
                    )}
                </>
            ) : (
                <p>User data not available.</p>
            )}
        </div>
    )
};