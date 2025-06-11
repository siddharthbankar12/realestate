import React, { useState, useEffect } from 'react';
import './StaffPerformanceCategories.css';

const StaffPerformanceCategories = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [performanceTiers, setPerformanceTiers] = useState([]);
  const [stats, setStats] = useState({
    totalStaff: 0,
    averageScore: 0,
    topPerformers: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiersRes, statsRes] = await Promise.all([
          fetch('http://localhost:8000/api/staff/performance-tiers'),
          fetch('http://localhost:8000/api/staff/performance-stats')
        ]);

        const tiersData = await tiersRes.json();
        const statsData = await statsRes.json();

        setPerformanceTiers(tiersData);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

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
          <span className="stat-number">{stats.totalStaff}</span>
        </div>
        <div className="stat-card">
          <h3>Average Performance Score</h3>
          <span className="stat-number">{stats.averageScore}/10</span>
        </div>
        <div className="stat-card">
          <h3>Top Performers</h3>
          <span className="stat-number">{stats.topPerformers}</span>
        </div>
      </div>
    </div>
  );
};

export default StaffPerformanceCategories;
