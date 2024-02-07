//imports
import PropTypes from 'prop-types';
import { Card } from "react-bootstrap";
import './movie-card.scss';

//renders the MovieCard component
export const MovieCard = ({ movieData, onCardClick }) => {

  return (
    <Card className="text-center" style={{ cursor: "pointer" }} onClick={onCardClick}>
      <Card.Body>
        <Card.Title className="text-truncate">{movieData.Title} ({movieData.Year})</Card.Title>
        <img src={movieData.Poster} alt={movieData.Title} style={{ width: "auto", height: "300px" }} />
      </Card.Body>
      Select for details
    </Card>
  );
};

//defines accepted data form
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};