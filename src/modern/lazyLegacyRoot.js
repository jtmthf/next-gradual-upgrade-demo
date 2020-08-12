import { useContext, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ReactReduxContext } from 'react-redux';

import ThemeContext from './shared/ThemeContext';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default async function lazyLegacyRoot(getLegacyComponent) {
  const [createLegacyRoot, Component] = await Promise.all([
    import('../legacy/createLegacyRoot').then((mod) => mod.default),
    getLegacyComponent().then((mod) => mod.default),
  ]);

  return function Wrapper(props) {
    const containerRef = useRef(null);
    const rootRef = useRef(null);

    // Populate every contexts we want the legacy subtree to see.
    // Then in src/legacy/createLegacyRoot we will apply them.
    const theme = useContext(ThemeContext);
    const router = useRouter();
    const reactRedux = useContext(ReactReduxContext);
    const context = useMemo(
      () => ({
        theme,
        router,
        reactRedux,
      }),
      [theme, router, reactRedux],
    );

    // Create/unmount.
    useIsomorphicLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createLegacyRoot(containerRef.current);
      }
      const root = rootRef.current;
      return () => {
        root.unmount();
      };
    }, [createLegacyRoot]);

    // Mount/update.
    useIsomorphicLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, context);
      }
    }, [Component, props, context]);

    // On first render we'll use legacy React to render the sub-app to a
    // string and then inject it with `dangerouslySetInnerHTML`
    return <div style={{ display: 'contents' }} ref={containerRef} />;
  };
}
