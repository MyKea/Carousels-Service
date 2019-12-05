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
      <div className="g-carousel-arrow left" data-dir="-1">
        <img src="./res/arrow-left.svg" alt="Left Arrow" className="g-carousel-arrow-image" />
      </div>
      <div className="g-item-slider">
        {items.map((item) => <Item key={item.id} item={item} onItemClick={onItemClick} />)}
      </div>
      <div className="g-carousel-arrow right" data-dir="1">
        <img src="./res/arrow-right.svg" alt="Right Arrow" className="g-carousel-arrow-image" />
      </div>
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
