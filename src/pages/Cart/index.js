import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

export default function Cart() {
  const cart = useSelector(state =>
    state.cart.items.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.items.reduce((totals, product) => {
        return totals + product.price * product.amount;
      }, 0)
    )
  );

  const cartIsEmpty = useMemo(() => !cart.length, [cart.length]);

  const dispatch = useDispatch();

  function handleDeleteProduct(productId) {
    dispatch(CartActions.removeFromCart(productId));
  }

  function decrementProduct(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function incrementProduct(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function handleContinue() {
    history.push('/');
  }

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
      {cartIsEmpty ? renderEmptyState() : renderComponent()}
    </Container>
  );
}
