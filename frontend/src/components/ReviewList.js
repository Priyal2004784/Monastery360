import React from 'react';

function ReviewList({ reviews }) {
  // A helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="review-list">
      <h3>Visitor Reviews & Suggestions</h3>
      {reviews.length === 0 ? (
        <p>Be the first to leave a review for this monastery.</p>
      ) : (
        reviews.map(review => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <strong>{review.name}</strong>
              <span className="review-date">{formatDate(review.createdAt)}</span>
            </div>
            <p className="review-text">{review.reviewText}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;