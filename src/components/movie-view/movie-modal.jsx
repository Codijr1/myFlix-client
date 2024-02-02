// imports
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const MovieModal = ({ show, handleClose, movieData, onAddToFavorites, user }) => {
    if (!movieData) {
        return null;
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{movieData.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Release Year: {movieData.Year}</p>
                <p>Director(s): {Array.isArray(movieData.Director) ? movieData.Director.join(", ") : movieData.Director}</p>
                <p>Genre(s): {Array.isArray(movieData.Genre) ? movieData.Genre.join(", ") : movieData.Genre}</p>
                <p>{movieData.Description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onAddToFavorites(user.Username, movieData._id)}>
                    Add to Favorites
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

MovieModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
};
