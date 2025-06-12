import React, { useState } from "react";
import styles from "./StaffSalesTargetManagement.module.css";
import { toast } from "react-toastify";

type Employee = {
  _id: string;
  name: string;
  email: string;
  department: string;
  joinDate: string;
};

type SalesTarget = {
  _id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  targetAmount: number;
  achievedAmount: number;
  targetProperties: number;
  achievedProperties: number;
  targetLeads: number;
  achievedLeads: number;
  performancePercentage: number;
  status: "Pending" | "In Progress" | "Achieved" | "Failed";
  createdAt: string;
  updatedAt: string;
};

interface StaffSalesTargetManagementProps {
  employees?: Employee[];
  salesTargets?: SalesTarget[];
  onCreateTarget?: (targetData: any) => void;
  onUpdateTarget?: (targetId: string, updateData: any) => void;
}

// Dummy data for employees
const dummyEmployees: Employee[] = [
  {
    _id: "emp001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@company.com",
    department: "Sales",
    joinDate: "2023-01-15"
  },
  {
    _id: "emp002",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    department: "Sales",
    joinDate: "2023-03-10"
  },
  {
    _id: "emp003",
    name: "Amit Singh",
    email: "amit.singh@company.com",
    department: "Marketing",
    joinDate: "2022-11-20"
  },
  {
    _id: "emp004",
    name: "Neha Gupta",
    email: "neha.gupta@company.com",
    department: "Sales",
    joinDate: "2023-05-08"
  },
  {
    _id: "emp005",
    name: "Vikram Patel",
    email: "vikram.patel@company.com",
    department: "Sales",
    joinDate: "2022-09-12"
  }
];

// Dummy data for sales targets
const dummySalesTargets: SalesTarget[] = [
  {
    _id: "target001",
    employeeId: "emp001",
    employeeName: "Rajesh Kumar",
    month: "June",
    year: 2025,
    targetAmount: 500000,
    achievedAmount: 420000,
    targetProperties: 8,
    achievedProperties: 7,
    targetLeads: 50,
    achievedLeads: 45,
    performancePercentage: 84.0,
    status: "In Progress",
    createdAt: "2025-06-01T00:00:00.000Z",
    updatedAt: "2025-06-10T00:00:00.000Z"
  },
  {
    _id: "target002",
    employeeId: "emp002",
    employeeName: "Priya Sharma",
    month: "June",
    year: 2025,
    targetAmount: 400000,
    achievedAmount: 450000,
    targetProperties: 6,
    achievedProperties: 8,
    targetLeads: 40,
    achievedLeads: 42,
    performancePercentage: 112.5,
    status: "Achieved",
    createdAt: "2025-06-01T00:00:00.000Z",
    updatedAt: "2025-06-08T00:00:00.000Z"
  },
  {
    _id: "target003",
    employeeId: "emp003",
    employeeName: "Amit Singh",
    month: "May",
    year: 2025,
    targetAmount: 300000,
    achievedAmount: 280000,
    targetProperties: 5,
    achievedProperties: 4,
    targetLeads: 35,
    achievedLeads: 38,
    performancePercentage: 93.3,
    status: "In Progress",
    createdAt: "2025-05-01T00:00:00.000Z",
    updatedAt: "2025-05-30T00:00:00.000Z"
  },
  {
    _id: "target004",
    employeeId: "emp004",
    employeeName: "Neha Gupta",
    month: "June",
    year: 2025,
    targetAmount: 350000,
    achievedAmount: 180000,
    targetProperties: 7,
    achievedProperties: 3,
    targetLeads: 45,
    achievedLeads: 22,
    performancePercentage: 51.4,
    status: "In Progress",
    createdAt: "2025-06-01T00:00:00.000Z",
    updatedAt: "2025-06-10T00:00:00.000Z"
  },
  {
    _id: "target005",
    employeeId: "emp005",
    employeeName: "Vikram Patel",
    month: "May",
    year: 2025,
    targetAmount: 600000,
    achievedAmount: 650000,
    targetProperties: 10,
    achievedProperties: 12,
    targetLeads: 60,
    achievedLeads: 58,
    performancePercentage: 108.3,
    status: "Achieved",
    createdAt: "2025-05-01T00:00:00.000Z",
    updatedAt: "2025-05-28T00:00:00.000Z"
  },
  {
    _id: "target006",
    employeeId: "emp001",
    employeeName: "Rajesh Kumar",
    month: "May",
    year: 2025,
    targetAmount: 450000,
    achievedAmount: 320000,
    targetProperties: 8,
    achievedProperties: 5,
    targetLeads: 50,
    achievedLeads: 35,
    performancePercentage: 71.1,
    status: "Failed",
    createdAt: "2025-05-01T00:00:00.000Z",
    updatedAt: "2025-05-31T00:00:00.000Z"
  },
  {
    _id: "target007",
    employeeId: "emp002",
    employeeName: "Priya Sharma",
    month: "April",
    year: 2025,
    targetAmount: 380000,
    achievedAmount: 395000,
    targetProperties: 6,
    achievedProperties: 7,
    targetLeads: 38,
    achievedLeads: 40,
    performancePercentage: 103.9,
    status: "Achieved",
    createdAt: "2025-04-01T00:00:00.000Z",
    updatedAt: "2025-04-30T00:00:00.000Z"
  },
  {
    _id: "target008",
    employeeId: "emp003",
    employeeName: "Amit Singh",
    month: "June",
    year: 2025,
    targetAmount: 320000,
    achievedAmount: 125000,
    targetProperties: 5,
    achievedProperties: 2,
    targetLeads: 35,
    achievedLeads: 18,
    performancePercentage: 39.1,
    status: "In Progress",
    createdAt: "2025-06-01T00:00:00.000Z",
    updatedAt: "2025-06-10T00:00:00.000Z"
  }
];

const StaffSalesTargetManagement: React.FC<StaffSalesTargetManagementProps> = ({
  employees = dummyEmployees,
  salesTargets = dummySalesTargets,
  onCreateTarget,
  onUpdateTarget,
}) => {
  const [activeTab, setActiveTab] = useState<"targets" | "performance" | "create">("targets");
  const [searchEmployee, setSearchEmployee] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Create Target Form State
  const [newTarget, setNewTarget] = useState({
    employeeId: "",
    month: "",
    year: new Date().getFullYear(),
    targetAmount: "",
    targetProperties: "",
    targetLeads: "",
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const filteredTargets = salesTargets.filter((target) => {
    const matchesEmployee = searchEmployee.trim() === "" || 
      target.employeeName.toLowerCase().includes(searchEmployee.toLowerCase());
    const matchesMonth = filterMonth === "" || target.month === filterMonth;
    const matchesYear = filterYear === "" || target.year.toString() === filterYear;
    const matchesStatus = filterStatus === "" || target.status === filterStatus;
    
    return matchesEmployee && matchesMonth && matchesYear && matchesStatus;
  });

  const handleCreateTarget = async () => {
    if (!newTarget.employeeId || !newTarget.month || !newTarget.targetAmount || 
        !newTarget.targetProperties || !newTarget.targetLeads) {
      toast.error("Please fill all required fields");
      return;
    }

    const selectedEmployee = employees.find(emp => emp._id === newTarget.employeeId);
    
    const targetData = {
      _id: `target${Date.now()}`,
      ...newTarget,
      employeeName: selectedEmployee?.name || "",
      targetAmount: parseFloat(newTarget.targetAmount),
      targetProperties: parseInt(newTarget.targetProperties),
      targetLeads: parseInt(newTarget.targetLeads),
      achievedAmount: 0,
      achievedProperties: 0,
      achievedLeads: 0,
      performancePercentage: 0,
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // For now, we'll simulate the API call with dummy data
      // Replace this with actual API call when ready
      if (onCreateTarget) {
        await onCreateTarget(targetData);
      } else {
        // Simulate success for demo purposes
        console.log("Created target:", targetData);
      }
      
      toast.success("Sales target created successfully!");
      setNewTarget({
        employeeId: "",
        month: "",
        year: currentYear,
        targetAmount: "",
        targetProperties: "",
        targetLeads: "",
      });
      setActiveTab("targets");
    } catch (error) {
      toast.error("Failed to create sales target");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Achieved": return "#28a745";
      case "In Progress": return "#ffc107";
      case "Failed": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 100) return "#28a745";
    if (percentage >= 75) return "#ffc107";
    if (percentage >= 50) return "#fd7e14";
    return "#dc3545";
  };

  const renderTargetsTab = () => (
    <div>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Months</option>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Achieved">Achieved</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Period</th>
              <th>Sales Target</th>
              <th>Achieved</th>
              <th>Properties Target</th>
              <th>Properties Achieved</th>
              <th>Leads Target</th>
              <th>Leads Achieved</th>
              <th>Performance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTargets.map((target) => (
              <tr key={target._id}>
                <td>{target.employeeName}</td>
                <td>{target.month} {target.year}</td>
                <td>₹{target.targetAmount.toLocaleString()}</td>
                <td>₹{target.achievedAmount.toLocaleString()}</td>
                <td>{target.targetProperties}</td>
                <td>{target.achievedProperties}</td>
                <td>{target.targetLeads}</td>
                <td>{target.achievedLeads}</td>
                <td>
                  <div className={styles.performanceCell}>
                    <div 
                      className={styles.performanceBar}
                      style={{ 
                        width: `${Math.min(target.performancePercentage, 100)}%`,
                        backgroundColor: getPerformanceColor(target.performancePercentage)
                      }}
                    ></div>
                    <span style={{ color: getPerformanceColor(target.performancePercentage) }}>
                      {target.performancePercentage.toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td>
                  <span 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(target.status) }}
                  >
                    {target.status}
                  </span>
                </td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
                  <button className={styles.viewBtn}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformanceTab = () => {
    const performanceStats = {
      totalTargets: salesTargets.length,
      achieved: salesTargets.filter(t => t.status === "Achieved").length,
      inProgress: salesTargets.filter(t => t.status === "In Progress").length,
      failed: salesTargets.filter(t => t.status === "Failed").length,
      avgPerformance: salesTargets.length > 0 
        ? salesTargets.reduce((sum, t) => sum + t.performancePercentage, 0) / salesTargets.length 
        : 0,
    };

    return (
      <div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Targets</h3>
            <div className={styles.statValue}>{performanceStats.totalTargets}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Achieved</h3>
            <div className={styles.statValue} style={{ color: "#28a745" }}>
              {performanceStats.achieved}
            </div>
          </div>
          <div className={styles.statCard}>
            <h3>In Progress</h3>
            <div className={styles.statValue} style={{ color: "#ffc107" }}>
              {performanceStats.inProgress}
            </div>
          </div>
          <div className={styles.statCard}>
            <h3>Failed</h3>
            <div className={styles.statValue} style={{ color: "#dc3545" }}>
              {performanceStats.failed}
            </div>
          </div>
          <div className={styles.statCard}>
            <h3>Avg Performance</h3>
            <div 
              className={styles.statValue}
              style={{ color: getPerformanceColor(performanceStats.avgPerformance) }}
            >
              {performanceStats.avgPerformance.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className={styles.topPerformers}>
          <h3>Top Performers This Month</h3>
          <div className={styles.performersList}>
            {salesTargets
              .filter(t => t.month === months[new Date().getMonth()] && t.year === currentYear)
              .sort((a, b) => b.performancePercentage - a.performancePercentage)
              .slice(0, 5)
              .map((target, index) => (
                <div key={target._id} className={styles.performerCard}>
                  <div className={styles.performerRank}>#{index + 1}</div>
                  <div className={styles.performerInfo}>
                    <div className={styles.performerName}>{target.employeeName}</div>
                    <div className={styles.performerStats}>
                      Performance: {target.performancePercentage.toFixed(1)}% | 
                      Sales: ₹{target.achievedAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCreateTab = () => (
    <div className={styles.createForm}>
      <h3>Create New Sales Target</h3>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Select Employee</label>
          <select
            value={newTarget.employeeId}
            onChange={(e) => setNewTarget({...newTarget, employeeId: e.target.value})}
            className={styles.formSelect}
          >
            <option value="">Choose Employee</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.name} - {employee.department}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Month</label>
          <select
            value={newTarget.month}
            onChange={(e) => setNewTarget({...newTarget, month: e.target.value})}
            className={styles.formSelect}
          >
            <option value="">Select Month</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Year</label>
          <select
            value={newTarget.year}
            onChange={(e) => setNewTarget({...newTarget, year: parseInt(e.target.value)})}
            className={styles.formSelect}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Sales Target (₹)</label>
          <input
            type="number"
            value={newTarget.targetAmount}
            onChange={(e) => setNewTarget({...newTarget, targetAmount: e.target.value})}
            className={styles.formInput}
            placeholder="Enter target amount"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Properties Target</label>
          <input
            type="number"
            value={newTarget.targetProperties}
            onChange={(e) => setNewTarget({...newTarget, targetProperties: e.target.value})}
            className={styles.formInput}
            placeholder="Number of properties"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Leads Target</label>
          <input
            type="number"
            value={newTarget.targetLeads}
            onChange={(e) => setNewTarget({...newTarget, targetLeads: e.target.value})}
            className={styles.formInput}
            placeholder="Number of leads"
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button 
          onClick={handleCreateTarget}
          className={styles.createBtn}
        >
          Create Target
        </button>
        <button 
          onClick={() => setActiveTab("targets")}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Sales & Target Management</h2>

      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabBtn} ${activeTab === "targets" ? styles.active : ""}`}
          onClick={() => setActiveTab("targets")}
        >
          Sales Targets
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "performance" ? styles.active : ""}`}
          onClick={() => setActiveTab("performance")}
        >
          Performance Analytics
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "create" ? styles.active : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create Target
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "targets" && renderTargetsTab()}
        {activeTab === "performance" && renderPerformanceTab()}
        {activeTab === "create" && renderCreateTab()}
      </div>
    </div>
  );
};

export default StaffSalesTargetManagement;