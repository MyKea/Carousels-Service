import T from 'prop-types';

const ENV = {
  serverPort: '3015',
  serverURL: 'localhost',
  productSchema: {
    id: T.number,
    name: T.string,
    price: T.number,
    rating: T.number,
    reviews: T.number,
    options: T.bool,
    image: T.string,
    loose: T.arrayOf(T.number),
    close: T.arrayOf(T.number),
  },
};

export default ENV;
