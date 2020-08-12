import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import ThemeContext from './shared/ThemeContext';

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('slategrey');

  function handleToggleClick() {
    if (theme === 'slategrey') {
      setTheme('hotpink');
    } else {
      setTheme('slategrey');
    }
  }

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <div style={{ fontFamily: 'sans-serif' }}>
          <div
            style={{
              margin: 20,
              padding: 20,
              border: '1px solid black',
              minHeight: 300,
            }}
          >
            <button onClick={handleToggleClick}>Toggle Theme Context</button>
            <br />
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeContext.Provider>
    </Provider>
  );
}
