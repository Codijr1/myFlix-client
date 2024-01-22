//imports
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";
import './movie-card.scss';

//creates the MovieCard components
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card style={{cursor:"pointer"}}onClick={()=>onMovieClick(movieData)}>
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
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
