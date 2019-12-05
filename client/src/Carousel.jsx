import React from 'react';
import T from 'prop-types';
import ENV from './config';
import Item from './Item';

const Carousel = ({
  items, position, onItemClick, title,
}) => (
  <>
    <div className="g-carousel-title">{title}</div>
    <div data-position={position} className="g-carousel-container">
      <button type="button" className="g-btn g-arrow-holder" disabled={position === 0} data-dir="-1">
        <div className="g-arrow left" />
        <div className="g-arrow-fill" />
      </button>
      <div className="g-item-slider">
        {items.map((item) => <Item key={item.id} item={item} onItemClick={onItemClick} />)}
      </div>
      <button type="button" className="g-btn g-arrow-holder" disabled={position === items.length - 4} data-dir="1">
        <div className="g-arrow right">&nbsp;</div>
        <div className="g-arrow-fill">&nbsp;</div>
      </button>
    </div>
  </>
);

Carousel.propTypes = {
  items: T.arrayOf(T.shape(ENV.productSchema)).isRequired,
  position: T.number.isRequired,
  onItemClick: T.func.isRequired,
  title: T.string.isRequired,
};

export default Carousel;
