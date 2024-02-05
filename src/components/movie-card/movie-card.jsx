//imports
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';

//renders the MovieCard component
export const MovieCard = ({ movieData, onCardClick }) => {

  return (
    <Card className="text-center" style={{ cursor: "pointer" }} onClick={onCardClick}>
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
    Director: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string.isRequired)
    ]).isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};