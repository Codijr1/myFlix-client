//imports
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//hooks
export const SignupView = () => {
  //hardcoded for testing
  const [username, setUsername] = useState("Username");
  const [password, setPassword] = useState("Password");
  const [email, setEmail] = useState("email@gmail.com");
  const [lastName, setLastName] = useState("Last");
  const [firstName, setFirstName] = useState("First");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      LastName: lastName,
      FirstName: firstName
    };

    // sends POST request to API to create a new user
    fetch("https://myflixproject-9c1001b14e61.herokuapp.com/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const responseData = await response.text();
        try {
          const jsonData = JSON.parse(responseData);
          if (response.ok) {
            toast.success("Signup Successful", 3000);
            navigate('/');
          } else {
            console.error('Server response error:', jsonData);
            throw new Error(jsonData.error || 'Signup failed');
          }
        } catch (error) {
          console.error("Error during signup:", error);
          toast.error(`Signup failed. ${error.message}`, 3000);
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        toast.error(`Signup failed. ${error.message}`, 3000);
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
