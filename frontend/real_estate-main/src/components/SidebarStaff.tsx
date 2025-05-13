// components/SidebarStaff.tsx
import React from "react";
import styles from "./SidebarStaff.module.css";
import { FaHome, FaUsers, FaBell, FaSignOutAlt } from "react-icons/fa";

type SidebarProps = {
  onSelect: (option: string) => void;
  selectedOption: string;
  menuOptions: { key: string; label: string; icon?: React.ReactNode }[];
};

const SidebarStaff: React.FC<SidebarProps> = ({
  onSelect,
  selectedOption,
  menuOptions,
}) => {
  return (
    <div className={styles.sidebarContainerStaff}>
      <div className={styles.sidebarMenuStaff}>
        {menuOptions.map((item) => (
          <div
            key={item.key}
            className={`${styles.sidebarOptionStaff} ${
              selectedOption === item.key ? styles.sidebarActiveStaff : ""
            }`}
            onClick={() => onSelect(item.key)}
          >
            <span className={styles.sidebarIconStaff}>{item.icon}</span>
            <span className={styles.sidebarLabelStaff}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarStaff;
