import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { ProductList } from './styles';

function Home(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await api.get('/products');
      const data = response.data.map(product => ({
        ...product,
        productFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleAddProduct = product => {
    const { dispatch } = props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  return (
    <ProductList>
      {products.map((product, index) => (
        <li key={index}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.productFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Home);
