import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar11.module.css";

export type SidebarType = {
  className?: string;
};

const Sidebar: FunctionComponent<SidebarType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onProfileSettingsTextClick = useCallback(() => {
    navigate("/user-profile");
  }, [navigate]);

  const onMyPropertiesTextClick = useCallback(() => {
    navigate("/user-properties0");
  }, [navigate]);

  const onPastSearchesTextClick = useCallback(() => {
    navigate("/user-past-searches0");
  }, [navigate]);

  const onSavedTextClick = useCallback(() => {
    navigate("/user-previously-saved0");
  }, [navigate]);

  const onContactedTextClick = useCallback(() => {
    navigate("/user-previously-contacted0");
  }, [navigate]);

  const onLogOutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={[styles.sidebar, className].join(" ")}>
      <div className={styles.sidebarChild} />
      <div className={styles.profileSettingsWrapper}>
        <div
          className={styles.profileSettings}
          onClick={onProfileSettingsTextClick}
        >
          Profile settings
        </div>
      </div>
      <div className={styles.myProperties} onClick={onMyPropertiesTextClick}>
        My properties
      </div>
      <div className={styles.logoutActions}>
        <div className={styles.pastSearches} onClick={onPastSearchesTextClick}>
          Past searches
        </div>
      </div>
      <div className={styles.previouslyViewedParent}>
        <b className={styles.previouslyViewed}>Previously viewed</b>
        <div className={styles.logoutActionItems}>
          <div className={styles.userActions}>
            <div className={styles.savedWrapper}>
              <div className={styles.saved} onClick={onSavedTextClick}>
                Saved
              </div>
            </div>
            <div className={styles.logoutActionItems1}>
              <div className={styles.contacted} onClick={onContactedTextClick}>
                Contacted
              </div>
            </div>
            <div className={styles.notifications}>Notifications</div>
            <div className={styles.logoutActionItems2}>
              <div className={styles.logOut} onClick={onLogOutTextClick}>
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
