import React, { useState } from 'react';

const initialFormState = { name: '', email: '', reviewText: '' };

function ReviewForm({ monasteryId, onReviewSubmit }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.reviewText) {
      alert('Please fill in your name and review.');
      return;
    }
    // Pass the form data and the monasteryId up to the parent
    onReviewSubmit({ ...formData, monasteryId });
    setFormData(initialFormState); // Reset the form
  };

  return (
    <div className="review-form-container">
      <h3>Leave a Review or Suggestion</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-grid">
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name (required)"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email (optional)"
          />
        </div>
        <textarea
          name="reviewText"
          value={formData.reviewText}
          onChange={handleInputChange}
          placeholder="Share your experience or suggestions... (required)"
          required
        />
        <button type="submit" className="cta-button">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;