export type SportRules = {
  minPlayers: number;
  maxPlayers: number;
};

export type EventStatus = 'OPEN' | 'COMPLETE' | 'CANCELLED' | 'FINISHED';

export class EventsService {
  validateSlots(totalSlots: number, sport: SportRules): void {
    if (totalSlots < sport.minPlayers || totalSlots > sport.maxPlayers) {
      throw new Error(`totalSlots must be between ${sport.minPlayers} and ${sport.maxPlayers}`);
    }
  }

  canApply(existingApplication: boolean): void {
    if (existingApplication) {
      throw new Error('User already applied to this event');
    }
  }

  nextStatus(acceptedPlayers: number, totalSlots: number): EventStatus {
    return acceptedPlayers >= totalSlots ? 'COMPLETE' : 'OPEN';
  }

  ensureOrganizerAction(isOrganizer: boolean): void {
    if (!isOrganizer) {
      throw new Error('Only organizer can accept or reject players');
    }
  }
}
