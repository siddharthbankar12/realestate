import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./MailPassword.module.css";

export type MailPasswordType = {
  className?: string;
  mail?: string;
  mailPlaceholder?: string;
  mailValue?: string;
  mailName?: string;
  onMailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  
  propPadding?: CSSProperties["padding"];
  propBorderRadius?: CSSProperties["borderRadius"];
  propPadding1?: CSSProperties["padding"];
  propBorderRadius1?: CSSProperties["borderRadius"];
};

const MailPassword: FunctionComponent<MailPasswordType> = ({
  className = "",
  mail,
  mailPlaceholder,
  mailValue,
  mailName,
  onMailChange,
  propPadding,
  propBorderRadius,
  propPadding1,
  propBorderRadius1,
}) => {
  const mailPasswordStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const confirmMailPasswordStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius,
      padding: propPadding1,
    };
  }, [propBorderRadius, propPadding1]);

  const rectangleDivStyle: CSSProperties = useMemo(() => {
    return {
      borderRadius: propBorderRadius1,
    };
  }, [propBorderRadius1]);

  return (
    <div
      className={[styles.mailPassword, className].join(" ")}
      style={mailPasswordStyle}
    >
      <div className={styles.mail}>{mail}</div>
      <div
        className={styles.confirmMailPassword}
        style={confirmMailPasswordStyle}
      >
        <div
          className={styles.confirmMailPasswordChild}
          style={rectangleDivStyle}
        />
        <input
          className={styles.mail1}
          placeholder={mailPlaceholder}
          type="text"
          value={mailValue}
          name={mailName}
          onChange={onMailChange}
        />
      </div>
    </div>
  );
};

export default MailPassword;
