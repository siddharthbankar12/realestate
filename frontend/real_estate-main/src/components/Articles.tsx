import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Articles.module.css"; // Create a new CSS module for the Articles component

const Articles: FunctionComponent = () => {
  const [article, setArticle] = useState(null);
  const chosenIndices = [0,2,3,8,9,17,43]; 

  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=real%20estate&apiKey=24bcf6c46b474bec8c8e6a95e67f0cbe'
        );
        const data = await response.json();

        // Function to select a random index different from the previous one
        const getRandomIndex = (excludedIndex: number | null, length: number) => {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * length);
          } while (randomIndex === excludedIndex);
          return randomIndex;
        };

        // Select a random index from the chosenIndices array, excluding the previous one
        const randomChosenIndex = getRandomIndex(previousIndex, chosenIndices.length);
        const selectedIndex = chosenIndices[randomChosenIndex];
        setPreviousIndex(randomChosenIndex);

        // Ensure the selected index is within the range of fetched articles
        if (selectedIndex < data.articles.length) {
          setArticle(data.articles[selectedIndex]);
        } else {
          console.warn("Selected index is out of range of fetched articles.");
        }
      } catch (error) {
        console.error("Error fetching the articles: ", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.articles}>
      <div className={styles.heading}>REAL ESTATE AROUND THE GLOBE</div>
      {article && (
        <div className={styles.article}>
          <img
            src={article.urlToImage || "/rectangle-39@2x.png"}
            alt="Article"
          />
          <div className={styles.content}>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.info}>{article.description}</div>
            <div className={styles.readmore}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                READ MORE ...
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
