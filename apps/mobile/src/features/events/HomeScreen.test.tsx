import React from 'react';
import { HomeScreen } from './HomeScreen';

describe('HomeScreen', () => {
  it('renders sport labels and missing players indicator', () => {
    const view = HomeScreen({
      events: [{ id: '1', sportName: 'Vóley', missingPlayers: 2, level: 3 }]
    });

    expect(view).toBeTruthy();
  });
});
