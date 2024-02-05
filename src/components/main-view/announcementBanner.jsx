import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Button } from "react-bootstrap";

export const AnnouncementBanner = () => {
    const [showBanner, setShowBanner] = useState(true);

    const handleClose = () => {
        setShowBanner(false);
    };

    return (
        <>
            {showBanner && (
                <Alert variant="info" className="fixed-bottom mb-0 text-center">
                    Upcoming Features:
                    -Movie posters for every movie
                    -Sorting features for the list
                    -General visual updates
                    -Bug fixes.
                    Thank you for checking out the app!
                    <Button type="button" className="close" onClick={handleClose}>Close
                    </Button>
                </Alert>
            )}
        </>
    );
};
