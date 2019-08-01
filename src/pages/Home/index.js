import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import { Container, ProductList } from './styles';

export default function Home() {
  const amount = useSelector(state =>
    state.cart.items.reduce((amounts, product) => {
      amounts[product.id] = product.amount;

      return amounts;
    }, {})
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(null);

  const loadingCart = useSelector(state => state.cart.loading);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const response = await api.get('/products');
      const data = response.data.map(product => ({
        ...product,
        productFormatted: formatPrice(product.price),
        loading: false,
      }));

      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (!loadingCart && addProduct) {
      const productList = products.map(item => ({ ...item, loading: false }));
      setProducts([...productList]);
      setAddProduct(null);
    }
  }, [addProduct, loadingCart, products]);

  function handleAddProduct(product) {
    const index = products.findIndex(item => item.id === product.id);
    products[index] = { ...products[index], loading: true };
    setProducts([...products]);
    setAddProduct(product);

    dispatch(CartActions.addToCartRequest(product.id));
  }

  const ButtonIconToCart = ({ amountProduct = 0 }) => (
    <React.Fragment>
      <MdAddShoppingCart size={16} color="#FFF" />
      {amountProduct}
    </React.Fragment>
  );

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
                <ButtonIconToCart amountProduct={amount[product.id]} />
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

  return loading ? renderLoading() : renderComponent();
}
