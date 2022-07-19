import React from 'react';
import Header from './header';
import MovieItem from './MovieItem';

import makeStyles from '@mui/styles/makeStyles'

import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  titleList: {
    padding: '20px 40px',
    boxSizing: 'border-box',
    marginTop: '140px',
  },
  titlesWrapper: {
    margin: '20px 0',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: '10px 10px'
  }
}))

const MovieList = () => {
  const classes = useStyles()
  const [movies, setMovies] = React.useState([])

  const getData = React.useCallback(() => {
    fetch('http://localhost:5000/api/movie')
      .then(res => res.json())
      .then(data => {
        setMovies(data)
      })
  }, [])

  React.useEffect(() => {
    getData();
  }, [getData])

  return (
    <>
      <Header reload={getData}/>

      <Box className={classes.titleList}>
        <Box className={classes.titlesWrapper}>
          {movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={index}
              movie={movie}
              reload={getData}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default MovieList;