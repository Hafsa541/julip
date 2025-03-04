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

const PageDeleteCollection = ({ dialog, handleDelete }) => {
  console.log('Collection Delete Dialoge called');

  return (
    <Dialog open={dialog.value} onClose={dialog.onFalse}>
      <DialogTitle align="center">
        <Typography fontWeight={700} fontSize={24} color="black">
          Delete Collection
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ color: 'text.secondary' }}>
        <Box>
          <FormControl sx={{ m: 1, width: 500 }}>
            <Typography fontWeight={500} fontSize={17} color="black" align="center">
              Are You sure you want to delete this collection?This cannot be undone.
            </Typography>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={dialog.onFalse} sx={{ py: 1, px: 3, border: '1px solid black' }}>
          <Typography fontWeight={700} fontSize={18} color="black">
            Nevermind
          </Typography>
        </Button>
        <Button
          onClick={handleDelete}
          sx={{
            py: 1,
            px: 5,
            border: '1px solid black',
            backgroundColor: '#FD5065',
            opacity: 1,
            color: 'white',
            '&:hover': {
              backgroundColor: '#FD5065',
            },
          }}
        >
          <Typography fontWeight={700} fontSize={18} color="white">
            Delete
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PageDeleteCollection;
PageDeleteCollection.propTypes = {
  dialog: PropTypes.any,
  handleDelete: PropTypes.func,
};
