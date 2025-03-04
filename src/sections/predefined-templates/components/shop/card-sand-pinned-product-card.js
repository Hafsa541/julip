import { Button, Card, CardContent, CardMedia, Container, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function SandPinnedProductCard({ item, colors, fonts }) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: '200px',
        border: '1px solid black',
        mx: 1,
        display: 'flex',
        borderRadius: 1,
        background: colors?.main,
      }}
    >
      <CardMedia sx={{ backgroundSize: 'cover', width: '100%', flex: 1 }} image={item?.image} />
      <CardContent
        sx={{
          flex: 1.5,
          position: 'relative',
          m: 0,
          p: 1,
          px: 2,
          pb: '0 !important',
        }}
      >
        <Container
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            mb: 0.7,
          }}
        >
          <Typography
            fontWeight={600}
            align="left"
            fontFamily={fonts?.header}
            fontSize={18}
            color={fonts?.mainTextColor}
          >
            {item?.title}
          </Typography>
        </Container>
        <Container
          disableGutters
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="body"
            align="left"
            fontSize={16}
            fontWeight={400}
            fontFamily={fonts?.body}
            color={fonts?.mainTextColor}
          >
            {item?.brand}
          </Typography>
          <Typography
            align="right"
            fontFamily={fonts?.header}
            fontSize={16}
            fontWeight="medium"
            color={fonts?.mainTextColor}
          >
            {item?.price}
          </Typography>
        </Container>

        <Typography
          variant="body"
          fontSize={15}
          fontWeight={400}
          fontFamily={fonts?.body}
          color={fonts?.mainTextColor}
          align="left"
          mt={1}
          paragraph
        >
          {item?.description}
        </Typography>

        <Button
          LinkComponent={Link}
          href={item?.url || 'https://www.amazon.com/'}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: 1,
            backgroundColor: colors?.buttons,
            border: '1px solid black',
            mb: 1,
            '&:hover': { backgroundColor: colors?.buttons, border: '1px solid black' },
          }}
        >
          <Typography
            variant="body"
            fontSize={18}
            fontWeight={600}
            fontFamily={fonts?.header}
            color={fonts?.buttonsTextColor}
          >
            {item?.buttonTitle || 'Get Yours'}
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}

export default React.memo(SandPinnedProductCard);

SandPinnedProductCard.propTypes = {
  item: PropTypes.object,
  colors: PropTypes.object,
  fonts: PropTypes.object,
};
