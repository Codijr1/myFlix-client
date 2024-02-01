//imports
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export const UpdateProfileForm = ({ show, onUpdateProfile, handleClose, newFirstName, newLastName, newUsername, newPassword, newEmail, setNewFirstName, setNewLastName, setNewUsername, setNewPassword, setNewEmail }) => {
    const handleUpdate = () => {
        onUpdateProfile({
            newFirstName,
            newLastName,
            newUsername,
            newPassword,
            newEmail
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNewFirstName">
                        <Form.Label>New First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new first name"
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewLastName">
                        <Form.Label>New Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new last name"
                            value={newLastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewUsername">
                        <Form.Label>New Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewEmail">
                        <Form.Label>New Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Submit Updates
                </Button>
            </Modal.Footer>
        </Modal>
    );
};