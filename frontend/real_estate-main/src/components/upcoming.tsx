import React from 'react';
import styles from './upcoming.module.css';

const Upcoming: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src="../upcoming.png" alt="Logo" className={styles.logo} />
        <h1>NEW ARRIVALS</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.card}>
            <img src="./ccu.png" alt="Image 2" />
            <div className={styles.content}>
              <h3>Chakrborty grih</h3>
              <p>sector 5  old Kolkata</p>
              <p><b>1 Cr</b></p>
            </div>
          
        </div>
        <div className={styles.card}>
         
            <img src="./Delhi.png" alt="Image 3" />
            <div className={styles.content}>
              <h3>Garg builder floor</h3>
              <p>sector 8 Dwarka Delhi</p>
              <p><b>1.9 Cr</b></p>
            </div>
        </div>
        <div className={styles.card}>
            <img src="./Mumbai.png" alt="Image 1" />
            <div className={styles.content}>
              <h3>Ashiyana Floor</h3>
              <p>sector 2 South Mumbai</p>
              <p><b>3 Cr</b></p>
            </div>
        </div>
        
        <div className={styles.card}>
            <img src="./gurugram.png" alt="Image 4" />
            <div className={styles.content}>
              <h3>Kailash Apartments</h3>
              <p>sector 5 Gurugram</p>
              <p><b>75 lakh</b></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
