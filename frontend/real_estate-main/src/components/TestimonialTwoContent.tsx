import { FunctionComponent, useEffect, useState } from "react";
import styles from "./TestimonialTwoContent.module.css";
import axios from "axios";
import { createLogicalAnd } from "typescript";

export type TestimonialTwoContentType = {
  className?: string;
};

export type Testimonial = {
  author: string;
  content: string;
  title: string;
  createdAt: string;
};

const TestimonialTwoContent: FunctionComponent<TestimonialTwoContentType> = ({
  className = "",
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/testimonials");
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className={styles.cardList}>
      {testimonials.map((testimonial: Testimonial, index: number) => (
        <div key={index} className={[styles.cardContent, className].join(" ")}>
          <div className={styles.wonderfulServiceParent}>
            <div className={styles.wonderfulService}>{testimonial.title}</div>
            <div className={styles.reviewDescription}>
              <i className={styles.loremIpsumHas}>{testimonial.content}</i>
            </div>
          </div>
          <div className={styles.cardContentChild} />
          <div className={styles.reviewAuthor}>
            <div className={styles.thejidmeinsDentist}>
              -{testimonial.author}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialTwoContent;
