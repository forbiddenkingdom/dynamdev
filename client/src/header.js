import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'

import makeStyles from '@mui/styles/makeStyles'

import {
  Box,
  Stack,
  Button,
  Modal,
  Typography,
  TextField
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  header: {
    background: '-webkit-gradient(linear,left top,left bottom,color-stop(0, #000),to(transparent))',
    background: 'linear-gradient(180deg, #000, transparent)',
    display: 'flex',
    padding: '40px 40px 0',
    position: 'fixed',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 5,
    top: 0,
  },
  search: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
  },
  modalWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 320,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    padding: 24,
    gap: 20
  }
}))

const Header = ({reload}) => {
  const classes = useStyles()
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [posterPath, setPosterPath] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    handleClose();
    fetch('http://localhost:5000/api/movie',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({title, overview, posterPath})
      })
      .then(res => res.json())
      .then(data => {
        if(data === "success") {
          reload();
        }
      })
  };

  return (
    <Box className={classes.header}>
      <Box id="search" className={classes.search}>
        {/*<input type="text" value={searchkey} name='searchkey' onChange={onChange} />*/}
        <Button
          variant="contained"
          color="success"
          endIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submit}>
          <Stack className={classes.modalWrap}>
            <Typography variant="h5">Add New Book</Typography>

            <TextField
              id="outlined-name"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              py={1}
            />

            <TextField
              id="outlined-name"
              label="posterPath"
              value={posterPath}
              onChange={(e) => setPosterPath(e.target.value)}
              required
              py={1}
            />

            <TextField
              id="outlined-name"
              label="Overview"
              value={overview}
              multiline
              rows={5}
              onChange={(e) => setOverview(e.target.value)}
              required
              py={1}
            />

            <Button
              variant="contained"
              color="success"
              type="submit"
            >
              Add
            </Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  )
}

export default Header;