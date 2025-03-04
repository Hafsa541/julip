import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';

const WebLinksButton = ({ links, colors, fonts }) => {
  const [first, setfirst] = useState();
  return (
    <Stack mb={5}>
      <Typography
        fontSize={18}
        fontWeight={700}
        fontFamily={fonts?.header}
        color={fonts?.mainTextColor}
      >
        Links
      </Typography>
      {links?.map(
        (link, index) =>
          link?.visibility && (
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
              LinkComponent={Link}
              href={link?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                fontWeight={600}
                fontSize={16}
                fontFamily={fonts?.header}
                color={fonts?.buttonsTextColor}
              >
                {link?.title}
              </Typography>

              <Iconify
                icon="eva:external-link-fill"
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

export default WebLinksButton;

WebLinksButton.propTypes = {
  links: PropTypes.array,
  colors: PropTypes.object,
  fonts: PropTypes.object,
};
