//imports
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

//hooks
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    //sends a POST request to API to log in using existing user data 
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        //debug
        // console.log("Server response:", response);
        return response.json();
      })
      .then((data) => {
        //debug
        // console.log("Login response:", data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("User Not Found");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Something went wrong during login. Check the console for details.");
      });
  };

  //renders LoginView component
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>Submit</Button>
    </Form>
  );
};
