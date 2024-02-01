import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateProfileForm } from './update-profile-modal';

export const ProfileView = ({ user, token, movies }) => {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (user && token) {
            const profileUrl = `https://myflixproject-9c1001b14e61.herokuapp.com/users/${user.Username}`;
            fetch(profileUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user, token]);
    const handleUpdateProfile = async ({ newFirstName, newLastName, newUsername, newPassword, newEmail }) => {
        try {
            const response = await fetch(`https://myflixproject-9c1001b14e61.herokuapp.com/users/${user.Username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    FirstName: newFirstName,
                    LastName: newLastName,
                    Username: newUsername,
                    Password: newPassword,
                    Email: newEmail
                }),
            });

            if (response.ok) {
                const updatedUserData = await response.json();
                setUserData(updatedUserData);
                console.log('Profile updated successfully');
            } else {
                console.error('Error updating profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


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
            <h2>{userData.Username}'s Info</h2>
            {userData ? (
                <>
                    <p>Username: {userData.Username}</p>
                    <p>Email: {userData.Email}</p>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Update Info
                    </Button>
                    {userData.favoriteMovies?.length > 0 ? (
                        <Row >
                            <h2>{userData.Username}'s Favorite Movies</h2>
                            {userData.favoriteMovies.map((movieId) => {
                                const movie = movies.find((m) => m._id === movieId.toString());
                                return (
                                    <Col sm="8" lg="4" key={movieId} md={6}>
                                        {movie ? (
                                            <div>
                                                <h4>{movie.Title} ({movie.Year})</h4>
                                                <p><h6>Description: </h6>{movie.Description}</p>
                                                <p><h6>Genre(s): </h6>{Array.isArray(movie.Genre) ? movie.Genre.join(", ") : movie.Genre}</p>
                                                <Button variant="danger" onClick={() => handleDeleteFromFavorites(movieId)}>Remove</Button>
                                            </div>
                                        ) : (
                                            <p>Movie not found</p>
                                        )}
                                    </Col>
                                );
                            })}
                        </Row>
                    ) : (
                        <h4>Your favorites go here, try adding some and returning</h4>
                    )}
                </>
            ) : (
                <p>User data not available.</p>
            )}
            <UpdateProfileForm
                show={showModal}
                handleClose={handleCloseModal}
                onUpdateProfile={handleUpdateProfile}
                newFirstName={newFirstName}
                newLastName={newLastName}
                newUsername={newUsername}
                newPassword={newPassword}
                newEmail={newEmail}
                setNewFirstName={setNewFirstName}
                setNewLastName={setNewLastName}
                setNewUsername={setNewUsername}
                setNewPassword={setNewPassword}
                setNewEmail={setNewEmail}
            />
        </div>
    )
};