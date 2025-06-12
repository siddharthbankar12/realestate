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
  
  const getPerformanceTiers = (req, res) => {
    res.status(200).json(performanceTiers);
  };
  
  module.exports = { getPerformanceTiers };
  
