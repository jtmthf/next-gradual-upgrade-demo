import React from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import ThemeContext from './shared/ThemeContext';
import lazyLegacyRoot from './lazyLegacyRoot';

// Lazy-load a component from the bundle using legacy React.
const Greeting = dynamic(lazyLegacyRoot(() => import('../legacy/Greeting')));

export default function AboutPage() {
  const theme = useContext(ThemeContext);
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <h2>src/modern/AboutPage.js</h2>
      <h3 style={{ color: theme }}>
        This component is rendered by the outer React ({React.version}).
      </h3>
      <Greeting />
      <br />
      <p>
        Counter: {counter}{' '}
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </p>
    </>
  );
}
