/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import CarouselStack from './CarouselStack';

console.log('component rendereing')
ReactDOM.render(<CarouselStack id={1} changeProduct={() => {}} />, document.getElementById('g-carousels'));
