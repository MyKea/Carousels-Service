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
      closeItems: [],
      closePosition: 0,
      closeRelPos: 0,
      carouselWidth: 0,
    };

    this.itemClicked = (event) => {
      changeProduct(event.target.dataset.id);
    };

    this.carouselShift = (event) => {
      const { state } = this;
      const { carousel } = event.currentTarget.parentNode.dataset;
      const position = carousel === 'close' ? 'closePosition' : 'loosePosition';
      const items = carousel === 'close' ? 'closeItems' : 'looseItems';
      const relative = carousel === 'close' ? 'closeRelPos' : 'looseRelPos';
      const direction = event.currentTarget.dataset.dir;
      const innerSlider = event.currentTarget.parentNode.childNodes[1].childNodes[0];
      const itemWidth = innerSlider.childNodes[0].getBoundingClientRect().width;
      const newPosition = Math.min(Math.max(state[position] - (4 * Number(direction)), -items.length + 4), 0);
      const newRelative = newPosition * itemWidth;
      console.log(relative, state[relative], newRelative);
      this.setState({
        [relative]: newRelative,
        [position]: newPosition,
      });
    };
  }

  componentDidMount() {
    this.getRelatedItems();
  }

  getRelatedItems() {
    const { id } = this.state;
    Axios.all([
      Axios.get(`http://${ENV.serverURL}:${ENV.serverPort}/products/${id}/related/close`),
      Axios.get(`http://${ENV.serverURL}:${ENV.serverPort}/products/${id}/related/loose`),
    ])
      .then((docsList) => {
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
      looseItems, loosePosition, looseRelPos, closeItems, closePosition, closeRelPos,
    } = this.state;
    return (
      <>
        <Carousel carousel="close" items={closeItems} position={closePosition} onItemClick={this.itemClicked} onArrowClick={this.carouselShift} relative={closeRelPos} title="Similar products" />
        <Carousel carousel="loose" items={looseItems} position={loosePosition} onItemClick={this.itemClicked} onArrowClick={this.carouselShift} relative={looseRelPos} title="You might also like" />
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
