import { FunctionComponent } from "react";
import styles from "./AboutUs.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfficeCard from "../components/OfficeCard";
import EmployeeCard from "../components/EmployeeCard";
import employees from "./employees";

const AboutUs: FunctionComponent = () => {
  return (
    <div className={styles.aboutUs}>
      <Navbar />

      <img className={styles.hero} src="/heroAboutUs.jpg" />

      <div className={styles.container}>
        <div className={styles.aboutus}>
          <div className={styles.heading}>About Us</div>
          <div className={styles.content}>
            Launched to revolutionize the real estate experience, our platform
            stands as your premier destination for all things real estate. We
            cater to every aspect of the market, connecting buyers, sellers,
            renters, and agents in a seamless, efficient, and cost-effective
            manner.
            <br />
            <br />
            Whether you’re looking to advertise your property, search for your
            next dream home, or stay updated with the latest trends and news in
            the real estate industry, our platform has it all. You can explore
            properties, manage listings, and access a wealth of resources
            designed to make your property journey as smooth as possible.
            <br />
            <br />
            <strong>Why Choose Us?</strong>
            <br />
            <br />
            Our platform boasts an extensive and diverse listing database,
            covering properties across numerous cities. We offer premium
            advertising options such as featured listings, banners, and
            dedicated project pages, helping you maximize visibility and reach
            the right audience.
            <br />
            <br />
            With a commitment to providing the most up-to-date and relevant
            information, we empower you to make informed decisions in your real
            estate endeavors. We’re here to make your property search faster,
            smarter, and more effective.
          </div>
        </div>

        <div className={styles.visionmission}>
          <div className={styles.vision}>
            <div className={styles.heading}>Our Vision</div>
            <div className={styles.content}>
              Our vision is to be the preeminent real estate platform, globally
              recognized for our unwavering dedication to innovation, trust, and
              unparalleled customer satisfaction. We strive to create a world
              where finding and acquiring the ideal property is a seamless and
              enjoyable experience.<br></br>
              <br></br>
              By harnessing cutting-edge technology and providing exceptional
              service, we aim to revolutionize the real estate industry, making
              it more efficient, transparent, and accessible to all.<br></br>
              <br></br> We are committed to empowering users with confidence and
              support at every step of their real estate journey, fostering
              long-lasting relationships built on trust and reliability.
            </div>
          </div>

          <div className={styles.mission}>
            <div className={styles.heading}>Our Mission</div>
            <div className={styles.content}>
              Our mission is to revolutionize the real estate experience by
              providing a comprehensive, reliable, and user-friendly platform.
              We are dedicated to empowering our users with the best tools and
              resources, enabling them to make well-informed decisions with
              confidence. Our platform is designed to cater to all aspects of
              the property market, ensuring that every transaction is smooth,
              transparent, and successful.
              <br></br>
              <br></br>
              We strive to be more than just a marketplace; we aim to be a
              trusted partner in your real estate journey. By offering
              unparalleled support and innovative solutions, we are committed to{" "}
              <strong>delivering an exceptional experience</strong> for every
              buyer, seller, and renter. Our goal is to set new standards in the
              industry, making property transactions not just easier, but truly
              transformative.
            </div>
          </div>
        </div>

        <div className={styles.offices}>
          <div className={styles.heading}>Our Offices</div>
          <div className={styles.locations}>
            <OfficeCard />
            <OfficeCard />
            <OfficeCard />
            <OfficeCard />
          </div>
        </div>

        <div className={styles.team}>
          <div className={styles.heading}>Meet Our Team</div>
          <div className={styles.members}>
            {employees.map((employee, index) => (
              <EmployeeCard key={index} {...employee} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
