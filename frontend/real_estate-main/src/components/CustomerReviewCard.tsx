import { FunctionComponent } from "react";
import styles from "./CustomerReviewCard.module.css";

export type CustomerReviewCardType = {
    imageUrl?: string;
    name: string;
    review: string;
    className?: string;
    onCustomerReviewCardContainerClick?: () => void;
};

const CustomerReviewCard: FunctionComponent<CustomerReviewCardType> = ({
    imageUrl,
    name ="",
    review ="",
    className = ""
}) => {
    return (
        <div className={[styles.CustomerReviewCard, className].join(" ")}>
            <div className={styles.profile}>
                <img className={styles.pfp} src={imageUrl}/>
                <p className={styles.name}>{name}</p>
            </div>
            <div className={styles.review}><i>{review}</i></div>
        </div>
    );
};

export default CustomerReviewCard;
