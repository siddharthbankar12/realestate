import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./PasswordInput.module.css";

export type PasswordInputType = {
  className?: string;
  password?: string;
  passwordPlaceholder?: string;

  /** Style props */
  propGap?: CSSProperties["gap"];
  propWidth?: CSSProperties["width"];
  propBorderRadius?: CSSProperties["borderRadius"];
  propBorderRadius1?: CSSProperties["borderRadius"];

  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput: FunctionComponent<PasswordInputType> = ({
  className = "",
  password,
  passwordPlaceholder,
  propGap,
  propWidth,
  propBorderRadius,
  propBorderRadius1,
  handleChange,
}) => {
  const passwordInputStyle: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const passwordStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const passwordFieldStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
    };
  }, [propBorderRadius]);

  const rectangleDivStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius1,
    };
  }, [propBorderRadius1]);

  return (
    <div
      className={[styles.passwordInput, className].join(" ")}
      style={passwordInputStyle}
    >
      <div className={styles.password} style={passwordStyle}>
        Password
      </div>
      <div className={styles.passwordField} style={passwordFieldStyle}>
        <div className={styles.passwordFieldChild} style={rectangleDivStyle} />
        <input
          className={styles.password1}
          placeholder={passwordPlaceholder}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
