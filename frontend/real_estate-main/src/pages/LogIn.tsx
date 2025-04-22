import { FunctionComponent } from "react";
import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";
import styles from "./LogIn.module.css";

const LogIn: FunctionComponent = () => {
  return (
    <div className={styles.logIn}>
      <Nav/>
      <LoginForm />
    </div>
  );
};

export default LogIn;
