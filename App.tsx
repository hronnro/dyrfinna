import React from 'react';

import { StateProvider } from './globalState';
import Core from './Core';

export default function App() {
  return (
    <StateProvider>
      <Core />
    </StateProvider>
  )
}
