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
            <Modal.Header>
                <Modal.Title className="mx-auto">{movieData.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <img src={movieData.Poster} alt={movieData.Title} style={{ width: "auto", height: "300px" }} />
                </div>
                <div>
                    <p><strong>Release Year:</strong> {movieData.Year}</p>
                    <p><strong>Director(s):</strong> {Array.isArray(movieData.Director) ? movieData.Director.join(", ") : movieData.Director}</p>
                    <p><strong>Genre(s):</strong> {Array.isArray(movieData.Genre) ? movieData.Genre.join(", ") : movieData.Genre}</p>
                    {/* <p><strong>Plot:</strong> {movieData.Description}</p> */}
                </div>
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href={movieData.Trailer} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
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
