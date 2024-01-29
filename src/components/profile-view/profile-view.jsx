// imports
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ProfileView component
export const ProfileView = ({ user }) => {
    const [userData, setUserData] = useState(null);
    const { Username } = useParams();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        // If there is a stored token, fetch the user data using the token
        if (storedToken) {
            fetch(`https://myflixproject-9c1001b14e61.herokuapp.com/users/${Username}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("User data:", data);
                    setUserData(data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.message);
                });
        }
    }, [Username]);


    // If userData is still null, you can show a loading message or spinner
    if (!userData) {
        return <div>Loading...</div>;
    }
    // renders ProfileView component
    return (
        <div>
            <h2>{userData.Username}'s Profile</h2>
            <div>
                <strong>Username:</strong> {userData.Username}
            </div>
            <div>
                <strong>Email:</strong> {userData.Email}
            </div>
            {/* will add more later*/}
        </div>
    );
};