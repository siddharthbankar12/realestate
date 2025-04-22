import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onAboutUsTextClick = useCallback(() => {
    navigate("/aboutus");
  }, [navigate]);

  const onBuyTextClick = useCallback(() => {
    navigate("/property-listings-page");
  }, [navigate]);

  const onRentTextClick = useCallback(() => {
    navigate("/rent");
  }, [navigate]);

  const onSellTextClick = useCallback(() => {
    navigate("/sell");
  }, [navigate]);

  const onAdminTextClick = useCallback(() => {
    navigate("/admin-login");
  }, [navigate]);

  return (
    <section className={[styles.footer, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.section}>
          <img
            src="../logo.png"
            alt="Logo"
            style={{ height: "7vh", width: "8vw" }}
          />
          <ul>
            <li>Mobile Apps</li>
            <li>Our Services</li>
            <li>Price Trends</li>
            <li>Post your Property</li>
            <li>Real Estate Investments</li>
            <li>Builders in India</li>
            <li>Area Converter</li>
            <li>Articles</li>
            <li>Rent Receipt</li>
            <li>Customer Service</li>
            <li>Sitemap</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Company</h4>
          <ul>
            <li onClick={onAboutUsTextClick}>About us</li>
            <li onClick={onBuyTextClick}>Buy</li>
            <li onClick={onRentTextClick}>Post Property</li>
            <li onClick={onAdminTextClick}>Admin</li>
            <li>Contact us</li>
            <li>Careers with us</li>
            <li>Terms & Conditions</li>
            <li>Request Info</li>
            <li>Feedback</li>
            <li>Report a problem</li>
            <li>Testimonials</li>
            <li>Privacy Policy</li>
            <li>Grievances</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Our Partners</h4>
          <ul>
            <li>
              <a
                href="https://www.naukri.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Naukri.com - Jobs in India
              </a>
            </li>
            <li>
              <a
                href="https://www.naukrigulf.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Naukrigulf.com - Jobs in Middle East
              </a>
            </li>
            <li>
              <a
                href="https://www.jeevansathi.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Jeevansathi.com - Matrimonials
              </a>
            </li>
            <li>
              <a
                href="https://www.brijj.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Brijj.com - Professional Networking
              </a>
            </li>
            <li>
              <a
                href="https://www.shiksha.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Shiksha.com - Education Career Info
              </a>
            </li>
            <li>
              <a
                href="https://www.policybazaar.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Policybazaar.com - Insurance India
              </a>
            </li>
            <li>
              <a
                href="https://www.paisabazaar.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                PaisaBazaar.com
              </a>
            </li>
            <li>
              <a
                href="https://www.ambitionbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                AmbitionBox.com
              </a>
            </li>
            <li>
              <a
                href="https://www.firstnaukri.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                FirstNaukri.com - A jobsite for campus hiring
              </a>
            </li>
            <li>
              <a
                href="https://www.jobhai.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Jobhai.com – Find Jobs Near You
              </a>
            </li>
            <li>
              <a
                href="https://www.techminis.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Techminis.com - Tech news on the go
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Contact Us</h4>
          <ul>
            <li>
              Toll-Free:
              <a href="tel:18004199099" className={styles.contactLink}>
                1800 41 99099
              </a>
            </li>
            <li className={styles.lightFont}>9:30 AM to 6:30 PM (Mon–Sun)</li>
            <li className={styles.topMargin}>
              Email:
              <a
                href="mailto:feedback@BasilAbode.com"
                className={styles.contactLink}
              >
                feedback@BasilAbode.com
              </a>
            </li>
          </ul>

          <div className={styles.socialMedia}>
            <h4>Connect with us</h4>
            <div className={styles.icons}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaYoutube className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter className={styles.icon} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.icon} />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4>Download the App</h4>
            <div className={styles.storeBadges}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="../GooglePlay.png"
                  width="155px"
                  alt="Get it on Google Play"
                  className={styles.storeImage}
                />
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="../AppStore.png"
                  width="155px"
                  alt="Download on the App Store"
                  className={styles.storeImage}
                />
              </a>
            </div>
            <h1 className={styles.lightFont}>
              Usage of BasilAbode.com to upload content showing area in non
              standard units or which enables targeting by
              religion/community/caste/race is prohibited. Please report
              inappropriate content by writing to us at
              <a href="mailto:report@basilabode.com"> report abuse</a>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
