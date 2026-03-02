const { ReviewsService } = require('../src/modules/reviews/reviews.service');

describe('ReviewsService', () => {
  const service = new ReviewsService();

  it('returns average rating with 2 decimals', () => {
    expect(service.calculateAverage([4, 5, 5])).toBe(4.67);
  });

  it('only allows confirmed participants', () => {
    expect(() => service.ensureParticipant(false)).toThrow('Only confirmed participants');
  });
});
