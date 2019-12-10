/* eslint-disable object-curly-newline */
/* eslint-env browser */
import React from 'react';
import Axios from 'axios';
import T from 'prop-types';
import Carousel from './Carousel';
import ENV from './config';

export default class CarouselStack extends React.Component {
  constructor(props) {
    super(props);

    const { id, changeProduct } = props;
    this.state = {
      id,
      looseItems: [],
      loosePosition: 0,
      looseRelPos: 0,
      looseScrollPos: 0,
      closeItems: [],
      closePosition: 0,
      closeRelPos: 0,
      closeScrollPos: 0,
      carouselWidth: 0,
      smallWindow: window.innerWidth < 1048,
    };

    this.canSlideCarousel = true;

    this.itemClicked = (event) => {
      changeProduct(event.target.dataset.id);
    };

    this.carouselShift = (event) => {
      if (!this.canSlideCarousel) return;
      const { type, outerSlider, button, oldPosition, oldRelative, innerSlider, items } = this.getSlideVariables(event);
      const { newPosition, newRelative } = this.calculateNewPosition({ button, items, oldPosition });
      this.animateCarousel({ type, innerSlider, oldRelative, newRelative });
      this.canSlideCarousel = false;
      setTimeout(() => { this.canSlideCarousel = true; }, 600);
      const scrollPercent = this.calculateScrollPercent({ items, newPosition });
      const newScrollPos = scrollPercent * (innerSlider.clientWidth - outerSlider.clientWidth);
      this.setState({
        [`${type}Position`]: newPosition,
        [`${type}RelPos`]: newRelative,
        [`${type}ScrollPos`]: newScrollPos,
      });
    };

    this.getSlideVariables = (event) => {
      const { state } = this;
      const button = event.currentTarget;
      const carousel = button.parentNode;
      const { type } = button.parentNode.dataset;
      const oldPosition = state[`${type}Position`];
      const items = state[`${type}Items`];
      const oldRelative = state[`${type}RelPos`];
      const outerSlider = carousel.childNodes[1];
      const innerSlider = outerSlider.childNodes[0];
      return {
        type, outerSlider, button, oldPosition, oldRelative, innerSlider, items,
      };
    };

    this.calculateNewPosition = ({
      button, items, oldPosition,
    }) => {
      const direction = button.dataset.dir;
      const indexDelta = 4 * direction;
      const minIndex = this.getMinIndex(items);
      const newPosition = Math.min(Math.max(oldPosition - indexDelta, minIndex), 0);
      const newRelative = newPosition * 25;
      return { newPosition, newRelative };
    };

    this.animateCarousel = ({
      type, innerSlider, oldRelative, newRelative,
    }) => {
      innerSlider.classList.remove(`g-animate-${type}`);
      (() => innerSlider.offsetWidth)();
      const sheet = document.styleSheets[0];
      let i = 0;
      for (i; i < sheet.rules.length - 1; i += 1) {
        if (sheet.rules[i].name === `g-carousel-slide-${type}`) {
          sheet.deleteRule(i);
        }
      }
      sheet.insertRule(`
        @keyframes g-carousel-slide-${type} {
          from {left: ${oldRelative}%}
          to {left: ${newRelative}%}
        }
      `);
      innerSlider.classList.add(`g-animate-${type}`);
    };

    this.onWindowResize = () => {
      this.setState({
        smallWindow: window.innerWidth < 1048,
      });
    };

    this.calculateSnapPosition = () => {

    };

    this.calculateScrollPercent = ({ items, newPosition }) => {
      const indexSpan = Math.abs(this.getMinIndex(items));
      const scrollPercent = Math.abs(newPosition) / indexSpan;
      return scrollPercent;
    };

    this.onCarouselScroll = (e) => {
      const outer = e.currentTarget;
      const scrollPercent = outer.scrollLeft / (outer.scrollWidth - outer.clientWidth);
      const { type } = e.currentTarget.parentNode.dataset;
      const scrollPos = `${type}ScrollPos`;
      this.setState({
        [scrollPos]: scrollPercent,
      });
    };

    this.getMinIndex = (items) => -items.length + 4;
  }

  componentDidMount() {
    console.log('component mounted')
    this.getRelatedItems();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  getRelatedItems() {
    const { id } = this.state;
    
    Axios.all([
      Axios.get(`http://${ENV.serverHosted}/products/${id}/related/close`),
      Axios.get(`http://${ENV.serverHosted}/products/${id}/related/loose`),
    ])
      .then((docsList) => {
        console.log('docslist');
        this.setState({
          closeItems: docsList[0].data,
          closePosition: 0,
          looseItems: docsList[1].data,
          loosePosition: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      looseItems, loosePosition, looseScrollPos, closeItems, closePosition, closeScrollPos, smallWindow, 
    } = this.state;
    return (
      <>
        <Carousel
          carousel="close"
          items={closeItems}
          position={closePosition}
          onItemClick={this.itemClicked}
          onArrowClick={this.carouselShift}
          smallWindow={smallWindow}
          onCarouselScroll={this.onCarouselScroll}
          scrollPosition={closeScrollPos}
          title="Similar products"
        />
        <Carousel
          carousel="loose"
          items={looseItems}
          position={loosePosition}
          onItemClick={this.itemClicked}
          onArrowClick={this.carouselShift}
          smallWindow={smallWindow}
          onCarouselScroll={this.onCarouselScroll}
          scrollPosition={looseScrollPos}
          title="You might also like"
        />
      </>
    );
  }
}
CarouselStack.propTypes = {
  id: T.number,
  changeProduct: T.func,
};
CarouselStack.defaultProps = {
  id: 40,
  changeProduct: () => {},
};
