'use client';

import React from 'react';
import PropTypes from 'prop-types';

import { MenuItem, Typography } from '@mui/material';
import CustomPopover from 'src/components/custom-popover';

import Iconify from 'src/components/iconify';

const PinnedProductPopover = ({ editDialog, deleteDialog, popover }) => (
  <CustomPopover
    open={popover.open}
    onClose={popover.onClose}
    arrow="left-top"
    sx={{ width: 120, backgroundColor: 'white' }}
  >
    <MenuItem
      onClick={() => {
        editDialog.onTrue();
        popover.onClose();
      }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
    >
      <Iconify icon="eva:edit-outline" />
      <Typography fontSize={15} fontWeight={500}>
        Edit
      </Typography>
    </MenuItem>

    <MenuItem
      onClick={() => {
        deleteDialog.onTrue();
        popover.onClose();
      }}
    >
      <Iconify icon="famicons:trash-outline" />
      <Typography fontSize={15} fontWeight={500}>
        Delete
      </Typography>
    </MenuItem>
  </CustomPopover>
);

export default PinnedProductPopover;
PinnedProductPopover.propTypes = {
  editDialog: PropTypes.any,
  deleteDialog: PropTypes.any,
  popover: PropTypes.any,
};
