import React from 'react';
import Loader from 'react-spinners/ClipLoader';

import { Container } from './styles';

export default function Loading({ size = 50, color = '#7159c1' }) {
  return (
    <Container className="loading">
      <Loader size={size} sizeUnit="px" color={color} />
    </Container>
  );
}
