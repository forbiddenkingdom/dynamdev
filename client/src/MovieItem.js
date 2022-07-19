import React from 'react';
import { Box } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  movie: {
    overflow: 'hidden',
    minWidth: '200px',
    position: 'relative',
    '& img': {
      width: '100%',
      display: 'block',
      WebkitTransition: 'all 1s ease',
      transition: 'all 1s ease',
    },
    '&:hover': {
      '& img': {
        WebkitTransform: 'scale(1.25)',
        transform: 'scale(1.25)',
      },
      '& div': {
        opacity: 1,
        pointerEvents: 'all',
      }
    }
  },
  overlay: {
    height: '100%',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    background: '-webkit-gradient(linear,left top,left bottom,color-stop(0, rgba(0, 0, 0, 0.75)),to(transparent))',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.75), transparent)',
    padding: '20px',
    pointerEvents: 'none',
    opacity: 0,
    WebkitTransition: 'opacity 0.125s ease',
    transition: 'opacity 0.125s ease',
  },
  title: {
    fontSize: '22px',
    fontWeight: 600,
    opacity: 0,
    WebkitTransition: 'opacity 0.25s ease',
    transition: 'opacity 0.25s ease',
  },
  plot: {
    fontSize: '14px',
    marginTop: '100px',
    fontWeight: 500,
    lineHeight: 1.6,
    height: '8em',
    opacity: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitTransition: 'margin 0.25s ease 0.125s, opacity 0.25s ease 0.25s',
    transition: 'margin 0.25s ease 0.125s, opacity 0.25s ease 0.25s',
  },
  listToggle: {
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    fontSize: '16px',
    border: '2px solid hsla(0, 0%, 100%, 0.2)',
    overflow: 'hidden',
    position: 'absolute',
    right: '10px',
    borderRadius: '32px',
    bottom: '10px',
    '& div': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '33px',
      width: '32px',
    },
    '& i': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '33px',
      width: '32px',
    }
  }
}))

const MovieItem = ({id, movie, reload}) => {
  const classes = useStyles()

  const deleteBook = async (id) => {
    fetch('http://localhost:5000/api/movie/'+id,
      {
        method: "DELETE",
      })
      .then(res => res.json())
      .then(data => {
        if(data === "success") {
          reload();
        }
      })
  }

  return (
    <Box className={classes.movie}>
      <img
        src={movie.poster_path}
        alt={movie.poster_path}
      />
      <Box className={classes.overlay}>
        <Box className={classes.title}>{movie.title}</Box>
        <Box className={classes.plot}>
          {movie.overview}
        </Box>
      </Box>
      <Box onClick={() => deleteBook(id)} className={classes.listToggle}>
        <Box>
          <i className="fa fa-fw fa-trash"></i>
        </Box>
      </Box>
    </Box>
  );
}

export default MovieItem;
