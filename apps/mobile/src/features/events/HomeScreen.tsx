import React from 'react';

export type EventCard = {
  id: string;
  sportName: string;
  missingPlayers: number;
  level: number;
};

export const HomeScreen = ({ events }: { events: EventCard[] }) => {
  return (
    <>
      {events.map((event) => (
        <React.Fragment key={event.id}>
          {`${event.sportName} · Faltan ${event.missingPlayers} · Nivel ${event.level}`}
        </React.Fragment>
      ))}
    </>
  );
};
