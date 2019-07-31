import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import { Container, ProductList } from './styles';

function Home({ addToCartRequest, amount }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(null);

  const loadingCart = useSelector(state => state.cart.loading);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const response = await api.get('/products');
      const data = response.data.map(product => ({
        ...product,
        productFormatted: formatPrice(product.price),
        loading: false,
      }));

      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const isLoading = () => loading;

  useEffect(() => {
    if (!loadingCart && addProduct) {
      const productList = products.map(item => ({ ...item, loading: false }));
      setProducts([...productList]);
      setAddProduct(null);
    }
  }, [addProduct, loadingCart, products]);

  const handleAddProduct = product => {
    const index = products.findIndex(item => item.id === product.id);
    products[index] = { ...products[index], loading: true };
    setProducts([...products]);
    setAddProduct(product);

    addToCartRequest(product.id);
  };

  const renderComponent = () => (
    <ProductList>
      {products.map((product, index) => (
        <li key={index}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.productFormatted}</span>
          <Button
            disabled={loadingCart}
            type="button"
            onClick={() => handleAddProduct(product)}
          >
            <div>
              {product.loading ? (
                <Loading size={15} color="#fff" />
              ) : (
                <React.Fragment>
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {amount[product.id] || 0}
                </React.Fragment>
              )}
            </div>
            <span>Adicionar ao carrinho</span>
          </Button>
        </li>
      ))}
    </ProductList>
  );

  const renderLoading = () => (
    <Container>
      <Loading />
    </Container>
  );

  return isLoading() ? renderLoading() : renderComponent();
}

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  amount: state.cart.items.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
