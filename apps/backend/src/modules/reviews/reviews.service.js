class ReviewsService {
  ensureParticipant(isParticipant) {
    if (!isParticipant) {
      throw new Error('Only confirmed participants');
    }
  }

  calculateAverage(ratings) {
    if (!ratings.length) return 0;

    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return Number((total / ratings.length).toFixed(2));
  }
}

module.exports = { ReviewsService };
