'use client';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Typography,
} from '@mui/material';
import React from 'react';

const AboutBasicLinksDeleteDialoge = ({ dialog, handleDelete }) => (
  <Dialog open={dialog.value} onClose={dialog.onFalse}>
    <DialogTitle align="center">
      <Typography fontSize={24} fontWeight={700} color="black">
        Delete link
      </Typography>
    </DialogTitle>
    <DialogContent sx={{ color: 'text.secondary' }}>
      <Box>
        <FormControl sx={{ m: 1, width: 500 }}>
          <Typography fontSize={16} color="black" fontWeight={500} align="center">
            Are You sure you want to delete this link?This cannot be undone.
          </Typography>
        </FormControl>
      </Box>
    </DialogContent>
    <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onClick={dialog.onFalse}
        sx={{ color: 'black', width: 150, height: 50, border: '1px solid black' }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Nevermind
        </Typography>
      </Button>
      <Button
        onClick={handleDelete}
        sx={{
          width: 150,
          height: 50,
          border: '1px solid black',
          backgroundColor: 'rgb(253, 80, 101)',
          opacity: 1,
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgb(253, 80, 101)',
          },
        }}
      >
        <Typography fontSize={18} fontWeight={700}>
          Delete
        </Typography>
      </Button>
    </DialogActions>
  </Dialog>
);
export default AboutBasicLinksDeleteDialoge;
AboutBasicLinksDeleteDialoge.propTypes = {
  dialog: PropTypes.object,
  handleDelete: PropTypes.func,
};
