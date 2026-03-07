export type Sport = {
  id: string;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  teamBased: boolean;
  requiresPositions: boolean;
};

export type EventStatus = 'OPEN' | 'COMPLETE' | 'CANCELLED' | 'FINISHED';
