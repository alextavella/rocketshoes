import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/format';

import Button from '../../components/Button';
import history from '../../services/history';

import { Container, ProductTable, Total, Empty } from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  const handleDeleteProduct = productId => {
    removeFromCart(productId);
  };

  const decrementProduct = product => {
    updateAmountRequest(product.id, product.amount - 1);
  };

  const incrementProduct = product => {
    updateAmountRequest(product.id, product.amount + 1);
  };

  const cartIsEmpty = () => !cart.length;

  const handleContinue = () => {
    history.push('/');
  };

  const renderComponent = () => (
    <React.Fragment>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={() => decrementProduct(product)}
                  >
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={product.amount}
                    width="40"
                  />
                  <button
                    type="button"
                    onClick={() => incrementProduct(product)}
                  >
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <Button onClick={() => handleDeleteProduct(product.id)}>
                  <MdDelete size={20} color="#7159c1" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </React.Fragment>
  );

  const renderEmptyState = () => (
    <Empty>
      <p>Carrinho Vazio</p>
      <Button onClick={() => handleContinue()}>Continuar Comprando</Button>
    </Empty>
  );

  return (
    <Container>
      {cartIsEmpty() ? renderEmptyState() : renderComponent()}
    </Container>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      priceFormatted: PropTypes.string,
      amount: PropTypes.number,
    })
  ),
  total: PropTypes.string.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.items.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subtotal: formatPrice(product.price * product.amount),
  })),

  total: formatPrice(
    state.cart.items.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
