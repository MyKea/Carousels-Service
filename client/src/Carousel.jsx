import React from 'react';
import T from 'prop-types';
import ENV from './config';
import Item from './Item';

const Carousel = ({
  items, position, onItemClick, title, onArrowClick, carousel,
}) => (
  <>
    <div className="g-carousel-title">{title}</div>
    <div data-position={position} className="g-carousel-container" data-carousel={carousel}>
      <button type="button" className="g-btn g-arrow-holder" disabled={position === 0} data-dir="-1" onClick={onArrowClick}>
        <div className="g-arrow g-left" />
        <div className="g-arrow-fill" />
      </button>
      <div className="g-item-slider-outer">
        <div
          className="g-item-slider"
          style={{
            width: `${(items.length / 4) * 100}%`,
          }}
        >
          {items.map((item) => <Item key={item.id} item={item} containerWidth={(items.length / 4) * 100} onItemClick={onItemClick} />)}
        </div>
      </div>
      <button type="button" className="g-btn g-arrow-holder" disabled={position === -items.length + 4} data-dir="1" onClick={onArrowClick}>
        <div className="g-arrow g-right" />
        <div className="g-arrow-fill" />
      </button>
    </div>
  </>
);

Carousel.propTypes = {
  items: T.arrayOf(T.shape(ENV.productSchema)).isRequired,
  position: T.number.isRequired,
  onItemClick: T.func.isRequired,
  title: T.string.isRequired,
  onArrowClick: T.func.isRequired,
  carousel: T.string.isRequired,
};

export default Carousel;
