import React from 'react';
import styles from './BankCard.module.css';

const BankCard = ({ bankName, logo, rating, loanProducts, interestRate }) => {
  return (
    <div className={styles.bankCard}>
      <div className={styles.bankLogo}>
        {logo ? (
        //   <img src={logo} alt={`${bankName} logo`} />
        <div style={{fontSize:'48px'}}>🏦</div>
        ) : (
          <div className={styles.placeholderLogo}>
            {bankName.charAt(0)}
          </div>
        )}
      </div>
      <div className={styles.bankInfo}>
        <h3 className={styles.bankName}>{bankName}</h3>
        <div className={styles.rating}>
          <span className={styles.stars}>
            {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
          </span>
          <span className={styles.ratingValue}>{rating}</span>
        </div>
        <div className={styles.loanInfo}>
          <p className={styles.products}>{loanProducts}+ Loan Products</p>
          <p className={styles.interestRate}>Starting from {interestRate}%</p>
        </div>
        <button className={styles.viewButton}>View Offers</button>
      </div>
    </div>
  );
};

export default BankCard;