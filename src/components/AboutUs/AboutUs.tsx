import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      
      <section className={styles.about}>
        <p>
          Welcome to our coffee world! We are passionate about delivering the 
          finest coffee experience. From sourcing the best beans to roasting 
          them to perfection, we ensure every cup tells a story.
        </p>
        <p>
          Our mission is to make every coffee moment special, whether you enjoy 
          it at home, in our cafes, or with friends. Quality, taste, and care 
          are at the heart of everything we do.
        </p>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <p>
          Our team of coffee enthusiasts works tirelessly to bring you the best 
          beans and brewing tips. Passion, creativity, and dedication fuel our 
          journey.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
