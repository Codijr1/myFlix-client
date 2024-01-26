//imports
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';
import { Link } from 'react-router-dom';

//creates the MovieCard components
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card style={{ cursor: "pointer" }} className='h100' onClick={() => onMovieClick(movieData)}>
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

// //creates the MovieCards 
// export const MovieCard = ({ movieData, onMovieClick }) => {
//   //debug
//   console.log('MovieCard data:', movieData)
//   return (
//     <Card style={{ cursor: "pointer" }} className='h100' onClick={() => onMovieClick(movieData)}>
//       <Card.Body>
//         <Card.Title>{movieData.Title}</Card.Title>
//         <Link to={`/movies/${encodeURIComponent(movieData.Title)}`}>
//           <Button variant="link">Open</Button>
//         </Link>
//       </Card.Body>
//     </Card>
//   );
// };

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