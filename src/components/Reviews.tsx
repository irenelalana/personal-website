"use client"
import React, { useEffect } from 'react';

const Reviews: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="reviews">
      <h1>Reviews</h1>
      <p>
        Have a look at what my athletes shared about their experience with Irela Aqua &amp; Fitness:
      </p>
      <div className="commonninja_component pid-02ff2de6-8231-483f-a327-152c343a7afd"></div>
    </section>
  );
};

export default Reviews;