

const getPerformanceStats = (req, res) => {
    const stats = {
      totalStaff: 1247,
      averageScore: 8.2,
      topPerformers: 248
    };
  
    res.status(200).json(stats);
  };
  
  module.exports = { getPerformanceStats };
  
