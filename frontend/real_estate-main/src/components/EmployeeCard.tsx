import { FunctionComponent } from "react";
import styles from "./EmployeeCard.module.css";

interface Employee {
  name: string;
  phone: string;
  email: string;
  imageUrl: string;
}

const EmployeeCard: FunctionComponent<Employee> = ({
  name,
  phone,
  email,
  imageUrl = "/usedefault.jpg",
}) => {
  return (
    <div className={styles.employeeCard}>
      <img className={styles.image} src={imageUrl} />
      <div className={styles.information}>
        <div className={styles.name}>{name}</div>
        <div className={styles.phone}>
          <img className={styles.icon} src="/phone.png" />
          {phone}
        </div>
        <div className={styles.email}>
          <img className={styles.icon} src="/mail.png" />
          {email}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
