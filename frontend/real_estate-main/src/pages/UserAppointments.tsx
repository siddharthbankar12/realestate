import { FunctionComponent } from "react";
import Navbar from "../components/Navbar";
import styles from "./UserAppointments.module.css";
import Sidebar from "../components/Sidebar";
import LottieAnimation from "../components/LottieAnimation";

const UserAppointments: React.FC = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <section className={styles.sidebarParent}>
                <Sidebar currentPage="user-appointments0"/>
                <main className={styles.mainContent}>
                    <div>
                        <div className={styles.buttons}>
                            <button className={styles.button}>Date</button>
                            <button className={styles.button}>Time</button>
                            <button className={styles.button}>Status</button>
                        </div>
                    </div>
                    <div className={styles.noAppointment}>
                        <LottieAnimation animationLink="https://lottie.host/2bc9990e-d2fb-4fd7-adf1-0a31c295f944/S3gYyygOxW.json" style={{ width: 500, height: 300 }} />
                    </div>
                    <div className={styles.txt}>
                        You haven’t booked any appointments yet!
                    </div>
                </main>
            </section>
        </div>
    );
}

export default UserAppointments;
