import { Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'src/app/redux/store';
import Iconify from 'src/components/iconify';

const CollectionDropdownButton = ({ colors, fonts }) => {
  const collections = useSelector((state) => state.shop.collections);
  return (
    <Stack my={5}>
      <Typography
        fontSize={18}
        fontWeight={700}
        fontFamily={fonts?.header}
        color={fonts?.mainTextColor}
      >
        Categories
      </Typography>

      {collections?.map(
        (collection, index) =>
          collection.visibility && (
            <Button
              key={index}
              variant="outlined"
              sx={{
                border: '1px solid black',
                borderRadius: 2,
                mx: 1.5,
                my: 1,
                padding: 1.5,
                position: 'relative',
                backgroundColor: colors?.buttons,
                '&:hover': {
                  backgroundColor: colors?.buttons,
                  border: '1px solid black',
                },
              }}
            >
              <Typography
                fontWeight={600}
                fontSize={16}
                fontFamily={fonts?.header}
                color={fonts?.buttonsTextColor}
              >
                {collection?.name}
              </Typography>
              <Iconify
                icon="eva:arrow-ios-downward-outline"
                sx={{
                  opacity: 0.8,
                  color: fonts?.buttonsTextColor,
                  position: 'absolute',
                  top: 13,
                  right: 15,
                }}
              />
            </Button>
          )
      )}
    </Stack>
  );
};

export default CollectionDropdownButton;

CollectionDropdownButton.propTypes = {
  colors: PropTypes.object,
  fonts: PropTypes.object,
};
