import React from 'react';
import { render } from 'react-dom';
import Container from './Container';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <Container />
  </div>
);

render(<App />, document.getElementById('root'));
