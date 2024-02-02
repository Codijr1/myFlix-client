//imports
import React from "react";
import './movie-view.scss';
import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import PropTypes from 'prop-types';

//formats and renders MovieView when a MovieCard is clicked
export const MovieView = ({ movies, user, onAddToFavorites, onCloseModal }) => {
  const { _id } = useParams();
  const movie = movies.find((m) => m._id === _id);

  const handleAddToFavorites = () => {
    if (!user) {
      alert('Please log in to add movies to favorites.');
      return;
    }
    onAddToFavorites(user.Username, _id);
  };

  //crash prevention
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Row>
      <Col>
        <div>
          <div>
            <span>Title:</span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span>Year:</span>
            <span>{movie.Year}</span>
          </div>
          <div>
            <span>Description:</span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span>Genre:</span>
            <span>{Array.isArray(movie.Genre) ? movie.Genre.join(", ") : movie.Genre}</span>
          </div>
          <div>
            <span>Director:</span>
            <span>{Array.isArray(movie.Director) ? movie.Director.join(", ") : movie.Director}</span>
          </div>
          <Button onClick={handleAddToFavorites}>Add this movie to my favorites</Button>
          <Button onClick={onCloseModal} className="back-button" style={{ cursor: "pointer" }}>
            Back
          </Button>
        </div >
      </Col>
    </Row>
  );
};

//defines accpted data form
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
      Director: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(PropTypes.string.isRequired)
      ]).isRequired,
      _id: PropTypes.string
    })
  ).isRequired
};