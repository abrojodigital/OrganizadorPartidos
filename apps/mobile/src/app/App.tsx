import React from 'react';
import { HomeScreen } from '../features/events/HomeScreen';

const events = [
  { id: '1', sportName: 'Fútbol 5', missingPlayers: 2, level: 3 },
  { id: '2', sportName: 'Básquet 3v3', missingPlayers: 1, level: 4 }
];

export default function App() {
  return <HomeScreen events={events} />;
}
