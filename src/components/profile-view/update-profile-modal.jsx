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
                <Modal.Title>All Fields Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNewFirstName">
                        <Form.Label>New First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=". . ."
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId=". . .">
                        <Form.Label>New Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=". . ."
                            value={newLastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewUsername">
                        <Form.Label>New Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=". . ."
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=". . ."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNewEmail">
                        <Form.Label>New Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=". . ."
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>
                    Submit Updates
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};