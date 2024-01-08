import React from "react";
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
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
        <span>{movie.Genre.join(", ")}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.Director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    Director: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};