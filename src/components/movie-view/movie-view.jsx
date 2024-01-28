//imports
import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import './movie-view.scss';
import { useParams } from "react-router";
import { Link } from "react-router-dom";


//formats and renders MovieView when a MovieCard is clicked
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId)

  return (
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
        <span>{movie.Director}</span>
      </div>
      <Link to={`/`}>
        <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
      </Link>
    </div >
  );
};

//defines accpted data form
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    Director: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired
};