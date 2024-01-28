//imports
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';
import { Link } from 'react-router-dom';

//renders the MovieCard component
export const MovieCard = ({ movieData }) => {
  //debug
  console.log('MovieCard data:', movieData)
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
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
  }).isRequired
};