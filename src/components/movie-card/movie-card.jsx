import PropTypes from 'prop-types';
export const MovieCard = ({ movieData, onMovieClick }) => {
  console.log(movieData);
    return (
      <div
        onClick={() => {
          onMovieClick(movieData);
        }}
      >
        {movieData.Title}
      </div>
    );
  };
  
  MovieCard.propTypes = {
    movieData: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
      Director: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };
