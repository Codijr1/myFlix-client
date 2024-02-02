//imports
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//hooks
export const SignupView = ({ onLoggedIn }) => {
  //hardcoded for testing
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      LastName: lastName,
      FirstName: firstName,
    };

    try {
      // sends POST request to API to create a new user
      const response = await fetch(
        "https://myflixproject-9c1001b14e61.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.text();
      const jsonData = JSON.parse(responseData);

      if (response.ok) {
        //if success log in
        toast.success("Signup Successful", 3000);
        loginUser(username, password);
      } else {
        console.error("Server response error:", jsonData);
        throw new Error(jsonData.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        "Signup failed. User already exists or input form is invalid",
        3000
      );
    }
  };

  const loginUser = (username, password) => {
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
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
          alert("Failed to connect to the server. Please try again later.");
        } else {
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        }
      });
  };

  //creates and renders SignupView component
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Sign Up
      </Button>
      <Button variant="secondary" onClick={() => navigate('/login')}>
        Existing Users Login
      </Button>
    </Form>
  );
};
