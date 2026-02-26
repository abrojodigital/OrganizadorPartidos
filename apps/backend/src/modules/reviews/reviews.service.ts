export class ReviewsService {
  ensureParticipant(isParticipant: boolean): void {
    if (!isParticipant) {
      throw new Error('Only confirmed participants can leave a review');
    }
  }

  calculateAverage(ratings: number[]): number {
    if (!ratings.length) return 0;

    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return Number((total / ratings.length).toFixed(2));
  }
}
