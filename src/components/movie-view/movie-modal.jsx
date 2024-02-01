// imports
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const MovieModal = ({ show, handleClose, movieData }) => {
    if (!movieData) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{movieData.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{movieData.Year}</p>
                <p>{movieData.Genre}</p>
                <p>{movieData.Description}</p>
            </Modal.Body>
            <Modal.Footer>
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
    movieData: PropTypes.object.isRequired,
};