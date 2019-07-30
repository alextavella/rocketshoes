import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

function Home({ addToCart }) {
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
    addToCart(product);
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
  addToCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Home);
