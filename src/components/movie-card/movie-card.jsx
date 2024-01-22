//imports
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

//creates the MovieCard components
export const MovieCard = ({ movieData, onMovieClick }) => {
  console.log(movieData);
  return (
    <Card onClick={()=>onMovieClick(movieData)}>
      <Card.Body>
        <Card.title>{movieData.title}</Card.title>
      </Card.Body>
    </Card>
  );
};

//defines accepted data form
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    Director: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
