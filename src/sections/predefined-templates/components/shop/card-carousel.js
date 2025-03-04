import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Container, Typography } from '@mui/material';

import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';
import WaterPinnedProductCard from './card-water-pinned-product-card';
import SandPinnedProductCard from './card-sand-pinned-product-card';

// ----------------------------------------------------------------------

function CardCarousel({ card, data, colors, fonts }) {
  const carousel = useCarousel({
    fade: false,
    swipeToSlide: true,
    slidesToShow: 1,
    autoplay: false,
    infinite: false,

    ...(card === 'Water' && {
      centerMode: true,
      centerPadding: 30,
    }),

    ...CarouselDots({
      rounded: false,
      sx: { mt: 3, color: colors.mainTextColor },
    }),
  });

  return (
    <Container
      disableGutters
      fixed
      maxWidth="md"
      sx={{
        width: '98%',
        position: 'relative',
        mb: 5,
        '& .slick-list': {
          // borderRadius: 2,
        },
      }}
    >
      <Typography
        sx={{ mb: 1, mt: 3 }}
        color={fonts?.mainTextColor}
        fontFamily={fonts?.header}
        fontWeight={600}
        fontSize={18}
      >
        {data?.name || 'My Favourite Pieces'}
      </Typography>

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data?.productsList?.map((item) => {
          if (item.visibility && card === 'Water') {
            return (
              <WaterPinnedProductCard key={item?.id} item={item} colors={colors} fonts={fonts} />
            );
          }
          if (item.visibility && card === 'Sand') {
            return (
              <SandPinnedProductCard key={item?.id} item={item} colors={colors} fonts={fonts} />
            );
          }
          return null;
        })}
      </Carousel>
    </Container>
  );
}
export default CardCarousel;
CardCarousel.propTypes = {
  card: PropTypes.string,
  data: PropTypes.array,
  colors: PropTypes.object,
  fonts: PropTypes.object,
};
