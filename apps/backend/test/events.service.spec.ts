import { EventsService } from '../src/modules/events/events.service';

describe('EventsService business rules', () => {
  const service = new EventsService();

  it('marks complete when accepted players reach total slots', () => {
    expect(service.nextStatus(10, 10)).toBe('COMPLETE');
  });

  it('prevents duplicate applications', () => {
    expect(() => service.canApply(true)).toThrow('User already applied');
  });
});
