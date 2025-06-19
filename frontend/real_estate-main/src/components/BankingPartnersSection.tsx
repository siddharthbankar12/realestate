import React, { useState, useEffect, useRef } from 'react';
import BankCard from './BankCard';
import styles from './BankingPartnersSection.module.css';

const BankingPartnersSection = () => {


type Bank = {
  _id: string;
  bankName: string;
  logo: string;
  rating: number;
  loanProducts: { productType: string }[];
  interestRate: number;
};


  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const cardsPerView = 4; // Number of cards visible at once

  const fetchBankingPartners = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/banking-partners?limit=20&isActive=true');
      if (!response.ok) {
        throw new Error('Failed to fetch banking partners');
      }
      const result = await response.json();
    //   setBanks(result.data || []);
    setBanks([
        {
          _id: '1',
          bankName: 'HDFC Bank',
          logo: '🏦',
          rating: 4.5,
          loanProducts: [{ productType: 'home_loan' }, { productType: 'personal_loan' }],
          interestRate: 8.5
        },
        {
          _id: '2',
          bankName: 'ICICI Bank',
          logo: 'https://logos-world.net/wp-content/uploads/2021/02/ICICI-Bank-Logo.png',
          rating: 4.3,
          loanProducts: [{ productType: 'home_loan' }, { productType: 'car_loan' }],
          interestRate: 8.7
        },
        {
          _id: '3',
          bankName: 'State Bank of India',
          logo: 'https://www.sbi.co.in/documents/16012/1400784/logo.png',
          rating: 4.2,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.4
        },
        {
          _id: '4',
          bankName: 'Axis Bank',
          logo: 'https://www.axisbank.com/images/default-source/revamp_new/bank-logos/axis-bank-logo.png',
          rating: 4.4,
          loanProducts: [{ productType: 'home_loan' }, { productType: 'personal_loan' }],
          interestRate: 8.6
        },
        {
          _id: '5',
          bankName: 'Kotak Mahindra Bank',
          logo: 'https://www.kotak.com/content/dam/Kotak/investor-relation/Financial-result/Kotak-logo.png',
          rating: 4.3,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.8
        },
        {
          _id: '6',
          bankName: 'Punjab National Bank',
          logo: 'https://www.pnbindia.in/images/logos/pnb-logo.png',
          rating: 4.1,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.3
        },
        {
          _id: '7',
          bankName: 'Bank of Baroda',
          logo: 'https://www.bankofbaroda.in/-/media/Project/BOB/CountryWebsites/India/Bob-Logo-Tagline.png',
          rating: 4.0,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.2
        },
        {
          _id: '8',
          bankName: 'Canara Bank',
          logo: 'https://canarabank.com/images/canara-bank-logo.png',
          rating: 4.1,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.1
        }
      ]);
    } catch (error) {
      console.error('Error fetching banking partners:', error);
      // Fallback demo data
      setBanks([
        {
          _id: '1',
          bankName: 'HDFC Bank',
          logo: 'https://logos-world.net/wp-content/uploads/2020/12/HDFC-Bank-Logo.png',
          rating: 4.5,
          loanProducts: [{ productType: 'home_loan' }, { productType: 'personal_loan' }],
          interestRate: 8.5
        },
        {
          _id: '2',
          bankName: 'ICICI Bank',
          logo: 'https://logos-world.net/wp-content/uploads/2021/02/ICICI-Bank-Logo.png',
          rating: 4.3,
          loanProducts: [{ productType: 'home_loan' }, { productType: 'car_loan' }],
          interestRate: 8.7
        },
        {
          _id: '3',
          bankName: 'State Bank of India',
          logo: 'https://www.sbi.co.in/documents/16012/1400784/logo.png',
          rating: 4.2,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.4
        },
        {
          _id: '4',
          bankName: 'Axis Bank',
          logo: 'https://www.axisbank.com/images/default-source/revamp_new/bank-logos/axis-bank-logo.png',
          rating: 4.4,
          loanProducts: [{ productType: 'home_loan' }, { productType: 'personal_loan' }],
          interestRate: 8.6
        },
        {
          _id: '5',
          bankName: 'Kotak Mahindra Bank',
          logo: 'https://www.kotak.com/content/dam/Kotak/investor-relation/Financial-result/Kotak-logo.png',
          rating: 4.3,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.8
        },
        {
          _id: '6',
          bankName: 'Punjab National Bank',
          logo: 'https://www.pnbindia.in/images/logos/pnb-logo.png',
          rating: 4.1,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.3
        },
        {
          _id: '7',
          bankName: 'Bank of Baroda',
          logo: 'https://www.bankofbaroda.in/-/media/Project/BOB/CountryWebsites/India/Bob-Logo-Tagline.png',
          rating: 4.0,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.2
        },
        {
          _id: '8',
          bankName: 'Canara Bank',
          logo: 'https://canarabank.com/images/canara-bank-logo.png',
          rating: 4.1,
          loanProducts: [{ productType: 'home_loan' }],
          interestRate: 8.1
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankingPartners();
  }, []);

  const handleNext = () => {
    if (currentIndex + cardsPerView < banks.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getMinInterestRate = (loanProducts) => {
    if (!loanProducts || loanProducts.length === 0) return 8.5;
    // This is a simplified version - in real implementation, you'd calculate from actual loan product data
    return Math.random() * (9.5 - 8.0) + 8.0;
  };

  if (loading) {
    return (
      <section className={styles.bankingPartnersSection}>
        <div className={styles.heading}>BANKING PARTNERS</div>
        <div className={styles.loading}>Loading banking partners...</div>
      </section>
    );
  }

  return (
    <section className={styles.bankingPartnersSection}>
      <div className={styles.heading}>BANKING PARTNERS</div>
      <div className={styles.carouselContainer}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &#8249;
        </button>
        
        <div className={styles.carouselWrapper}>
          <div 
            className={styles.carousel}
            ref={containerRef}
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {banks.map((bank) => (
              <div key={bank._id} className={styles.cardWrapper}>
                <BankCard
                  bankName={bank.bankName}
                  logo={bank.logo}
                  rating={bank.rating || 4.0}
                  loanProducts={bank.loanProducts?.length || 0}
                  interestRate={getMinInterestRate(bank.loanProducts).toFixed(1)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          disabled={currentIndex + cardsPerView >= banks.length}
        >
          &#8250;
        </button>
      </div>
      
      <div className={styles.indicators}>
        {Array.from({ length: Math.max(0, banks.length - cardsPerView + 1) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default BankingPartnersSection;