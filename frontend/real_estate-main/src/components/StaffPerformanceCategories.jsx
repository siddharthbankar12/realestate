import React, { useState } from 'react';
import './StaffPerformanceCategories.css';

const StaffPerformanceCategories = () => {
  const [selectedTier, setSelectedTier] = useState(null);

  const performanceTiers = [
    {
      id: 'diamond',
      name: 'Diamond',
      color: '#B9F2FF',
      icon: '💎',
      description: 'Exceptional performance - Top 5% of staff',
      criteria: ['Exceeds all targets by 25%+', 'Leadership qualities', 'Innovation contributor'],
      benefits: ['Highest bonus tier', 'Priority training', 'Leadership opportunities']
    },
    {
      id: 'platinum',
      name: 'Platinum',
      color: '#E5E4E2',
      icon: '🏆',
      description: 'Outstanding performance - Top 15% of staff',
      criteria: ['Exceeds targets by 15-25%', 'Mentors others', 'Consistent excellence'],
      benefits: ['Premium bonus', 'Advanced training', 'Project leadership']
    },
    {
      id: 'gold',
      name: 'Gold',
      color: '#FFD700',
      icon: '🥇',
      description: 'Excellent performance - Top 35% of staff',
      criteria: ['Meets all targets', 'Team collaboration', 'Quality work delivery'],
      benefits: ['Standard bonus', 'Skill development', 'Recognition awards']
    },
    {
      id: 'silver',
      name: 'Silver',
      color: '#C0C0C0',
      icon: '🥈',
      description: 'Good performance - Meets expectations',
      criteria: ['Meets most targets', 'Reliable performance', 'Team participation'],
      benefits: ['Base bonus', 'Training opportunities', 'Performance support']
    }
  ];

  return (
    <div className="staff-performance-container">
      <div className="performance-header">
        <h1>Staff Performance Categories</h1>
        <p>Recognition tiers based on performance excellence</p>
      </div>

      <div className="tiers-grid">
        {performanceTiers.map((tier) => (
          <div
            key={tier.id}
            className={`tier-card ${selectedTier === tier.id ? 'selected' : ''}`}
            onClick={() => setSelectedTier(selectedTier === tier.id ? null : tier.id)}
            style={{ borderColor: tier.color }}
          >
            <div className="tier-header" style={{ backgroundColor: tier.color }}>
              <span className="tier-icon">{tier.icon}</span>
              <h2 className="tier-name">{tier.name}</h2>
            </div>
            
            <div className="tier-content">
              <p className="tier-description">{tier.description}</p>
              
              {selectedTier === tier.id && (
                <div className="tier-details">
                  <div className="criteria-section">
                    <h4>Performance Criteria:</h4>
                    <ul>
                      {tier.criteria.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="benefits-section">
                    <h4>Benefits & Rewards:</h4>
                    <ul>
                      {tier.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="performance-stats">
        <div className="stat-card">
          <h3>Total Staff Evaluated</h3>
          <span className="stat-number">1,247</span>
        </div>
        <div className="stat-card">
          <h3>Average Performance Score</h3>
          <span className="stat-number">8.2/10</span>
        </div>
        <div className="stat-card">
          <h3>Top Performers</h3>
          <span className="stat-number">248</span>
        </div>
      </div>
    </div>
  );
};

export default StaffPerformanceCategories;
