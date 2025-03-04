import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'src/app/redux/store';
import CardCarousel from './card-carousel';
import CollectionDropdownButton from '../collection-dropdown-button';

const ShopOption = ({ card, colors, fonts }) => {
  const pinnedProducts = useSelector((state) => state.shop.pinnedProducts);

  return (
    <>
      {pinnedProducts.visibility && (
        <CardCarousel card={card} data={pinnedProducts} colors={colors} fonts={fonts} />
      )}
      <CollectionDropdownButton colors={colors} fonts={fonts} />
    </>
  );
};

export default ShopOption;
ShopOption.propTypes = {
  card: PropTypes.string,
  colors: PropTypes.object,
  fonts: PropTypes.object,
};
