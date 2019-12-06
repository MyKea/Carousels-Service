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
      closeItems: [],
      closePosition: 0,
    };

    this.itemClicked = (event) => {
      changeProduct(event.target.dataset.id);
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
      looseItems, loosePosition, closeItems, closePosition,
    } = this.state;
    return (
      <>
        <Carousel items={closeItems} position={closePosition} onItemClick={this.itemClicked} title="Similar products" />
        <Carousel items={looseItems} position={loosePosition} onItemClick={this.itemClicked} title="You might also like" />
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
