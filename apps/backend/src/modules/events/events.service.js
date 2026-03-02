class EventsService {
  validateSlots(totalSlots, sport) {
    if (totalSlots < sport.minPlayers || totalSlots > sport.maxPlayers) {
      throw new Error(`totalSlots must be between ${sport.minPlayers} and ${sport.maxPlayers}`);
    }
  }

  canApply(existingApplication) {
    if (existingApplication) {
      throw new Error('User already applied');
    }
  }

  nextStatus(acceptedPlayers, totalSlots) {
    return acceptedPlayers >= totalSlots ? 'COMPLETE' : 'OPEN';
  }

  ensureOrganizerAction(isOrganizer) {
    if (!isOrganizer) {
      throw new Error('Only organizer can accept or reject players');
    }
  }
}

module.exports = { EventsService };
