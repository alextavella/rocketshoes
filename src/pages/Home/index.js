import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { ProductList } from './styles';

export default function Home() {
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

  return (
    <ProductList>
      {products.map((product, index) => (
        <li key={index}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.productFormatted}</span>
          <button type="button">
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
