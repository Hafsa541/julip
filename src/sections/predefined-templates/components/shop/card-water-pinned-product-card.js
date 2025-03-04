import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function WaterPinnedProductCard({ item, colors, fonts }) {
  return (
    <Card
      key={item?.id}
      variant="outlined"
      sx={{
        background: colors?.main,
        border: '1px solid black',
        mx: 1,
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          aspectRatio: '16 / 9 ',
          width: '100%',
        }}
        image={item?.image}
      />
      <CardContent
        sx={{
          padding: 0,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            background: colors?.main,
            border: '1px solid black',
            borderRadius: 1,
            mx: 2,
            px: 1,
            py: 0.5,
            position: 'relative',
            bottom: 10,
          }}
        >
          <Typography
            variant="body"
            fontWeight="bold"
            fontFamily={fonts?.header}
            color={fonts?.mainTextColor}
            fontSize={16}
          >
            {item?.title}
          </Typography>
        </Box>

        {/* Item Description */}
        <Box alignItems="center" justifyContent="center" display="flex" px={1.25}>
          <Typography
            variant="body"
            fontSize={15}
            align="center"
            fontWeight="light"
            fontFamily={fonts?.body}
            color={fonts?.backgroundTextColor}
            mx={1}
            mt={2}
            width="80%"
          >
            {item?.description}
          </Typography>
        </Box>

        {/* Item Brand and Price */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            my: 1.5,
          }}
        >
          <Typography
            variant="body"
            fontSize={16}
            fontFamily={fonts?.body}
            fontWeight="light"
            color={fonts?.backgroundTextColor}
          >
            {item?.brand || 'Item Brand'}
          </Typography>
          <Typography
            variant="body"
            fontSize={16}
            fontWeight="bold"
            fontFamily={fonts?.body}
            color={fonts?.backgroundTextColor}
          >
            {item?.price || '$ 19.99'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ mb: 0.75 }}>
        <Button
          fullWidth
          LinkComponent={Link}
          href={item?.url || 'https://www.amazon.com/'}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          sx={{
            borderRadius: 1,
            border: '1px solid black',
            mt: 'auto',
            mx: 1,
            py: 1,
            backgroundColor: colors?.buttons,

            '&:hover': {
              backgroundColor: colors?.buttons,
            },
          }}
        >
          <Typography
            variant="body"
            fontSize={16}
            fontWeight="bold"
            fontFamily={fonts?.header}
            color={fonts?.buttonsTextColor}
          >
            {item?.buttonTitle || 'Get Yours'}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(WaterPinnedProductCard);

WaterPinnedProductCard.propTypes = {
  item: PropTypes.object,
  colors: PropTypes.object,
  fonts: PropTypes.object,
};
