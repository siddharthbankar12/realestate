import React, { useState, FunctionComponent } from "react";
import styles from "./ContactForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Importing WhatsApp icon

const ContactForm: FunctionComponent = (props) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section className={styles.WhatsappContact}>
            <div className={styles.contactContainer}>
                <div className={styles.whatsappSection}>
                    <a href={`{https://wa.me/{props.phone}`} className={styles.whatsappLink}>
                        <button className={styles.whatsappButton}>
                            <FontAwesomeIcon icon={faWhatsapp} className={styles.whatsappIcon} />
                            <span className={styles.whatsappNumber}>{props.phone}</span>
                        </button>
                    </a>
                </div>
                <div className={styles.enquiryText}>Or Submit an enquiry</div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                    />
                    <div className={styles.phoneContainer}>
                        <select id="countryCode" className={styles.countryCode}>
                            <option value="+91">+91</option>
                           
                        </select>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Number"
                        />
                    </div>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message (optional)"
                    ></textarea>
                    <button className={styles.btn} type="submit">Send Enquiry</button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;

