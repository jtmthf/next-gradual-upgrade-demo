import React from 'react';

import useTime from './useTime';

export default function Clock() {
  const time = useTime();
  return <p suppressHydrationWarning>Time: {time}</p>;
}
