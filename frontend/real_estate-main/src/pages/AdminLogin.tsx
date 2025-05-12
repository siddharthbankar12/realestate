import { FunctionComponent } from "react";
import Nav from "../components/Nav";
import Content from "../components/Content1";
import styles from "./AdminLogin.module.css";

const AdminLogin: FunctionComponent = () => {
  return (
    <div className={styles.adminLogin}>
      {/* <Nav /> */}
      <Content />
    </div>
  );
};

export default AdminLogin;
