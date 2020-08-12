import { createContext } from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from './shared/ThemeContext';

// Note: this is a semi-private API, but it's ok to use it
// if we never inspect the values, and only pass them through.
import { Provider } from 'react-redux';

export const RouterContext = createContext();

// Pass through every context required by this tree.
// The context object is populated in src/modern/withLegacyRoot.
function Bridge({ children, context }) {
  return (
    <ThemeContext.Provider value={context.theme}>
      <RouterContext.Provider value={context.router}>
        {/*
          If we used the newer react-redux@7.x in the legacy/package.json,
          we would instead import {ReactReduxContext} from 'react-redux'
          and render <ReactReduxContext.Provider value={context.reactRedux}>.
        */}
        <Provider store={context.reactRedux.store}>{children}</Provider>
      </RouterContext.Provider>
    </ThemeContext.Provider>
  );
}

export default function createLegacyRoot(container) {
  return {
    render(Component, props, context) {
      ReactDOM.render(
        <Bridge context={context}>
          <Component {...props} />
        </Bridge>,
        container,
      );
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}
