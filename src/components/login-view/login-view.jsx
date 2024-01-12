//imports
import React, { useState } from "react";

//hooks
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        console.log("Server response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Login response:", data);
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
