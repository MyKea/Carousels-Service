import React from 'react';
import T from 'prop-types';
import ENV from './config';

const Carousel = ({ items, position, onItemClick }) => (
  <div data-position={position}>
    {items.map((item) => <button type="button" key={item.id} data-id={item.id} onClick={onItemClick}>{item.name}</button>)}
  </div>
);

Carousel.propTypes = {
  items: T.arrayOf(T.shape(ENV.productSchema)).isRequired,
  position: T.number.isRequired,
  onItemClick: T.func.isRequired,
};

export default Carousel;
