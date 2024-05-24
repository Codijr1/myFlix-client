import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          navigate('/');
        } else {
          toast.error("User Not Found");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);

        if (
          error instanceof TypeError &&
          error.message === "Failed to fetch"
        ) {
          alert(
            "Failed to connect to the server. Please try again later."
          );
        } else {
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        }
      });
  };

  const handleDemoLogin = () => {
    setUsername("Username");
    setPassword("Password");

    setTimeout(() => {
      document.getElementById("login-form").requestSubmit();
    }, 0);
  };

  return (
    <Form id="login-form" onSubmit={handleSubmit}>
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
      <div className="button-group">
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="secondary" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
        <Button variant="success" onClick={handleDemoLogin}>
          Demo Login
        </Button>
      </div>
    </Form>
  );
};
