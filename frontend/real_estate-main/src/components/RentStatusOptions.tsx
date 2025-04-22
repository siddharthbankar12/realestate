import { FunctionComponent, useState } from "react";
import styles from "./TypeStatusOptions.module.css";

export type TypeStatusOptionsType = {
  className?: string;
};

const TypeStatusOptions: FunctionComponent<TypeStatusOptionsType> = ({
  className = "",
}) => {
  const [propertyType, setPropertyType] = useState("residential");

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
  };

  return (
    <div className={[styles.typeStatusOptions, className].join(" ")}>
      <div className={styles.propertyDetailsContent}>
        <div className={styles.propertyNameWrapper}>
          <div className={styles.propertyName}>Property Title*</div>
        </div>
        <div className={styles.propertyNameInput}>
          <div className={styles.propertyNameInputChild} />
          <div className={styles.rectangleContainer}>
            <div className={styles.frameInner} />
            <input
              className={[styles.bhk1, styles.commonInput].join(" ")}
              placeholder="Property Title"
              type="text"
            />
          </div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.descriptionWrapper}>
            <div className={styles.description}>Description</div>
          </div>
          <div className={[styles.rectangleContainer, styles.largeInputContainer].join(" ")}>
            <div className={styles.frameInner} />
            <input
              className={[styles.bhk1, styles.commonInput, styles.largeInput].join(" ")}
              placeholder="Description"
              type="text"
            />
          </div>
        </div>
        <div className={styles.locationParent}>
          <div className={styles.locationWrapper}>
            <div className={styles.location}>Address*</div>
          </div>
          <div className={[styles.rectangleContainer, styles.largeInputContainer].join(" ")}>
            <div className={styles.frameInner} />
            <input
              className={[styles.bhk1, styles.commonInput, styles.largeInput].join(" ")}
              placeholder="Address"
              type="text"
            />
          </div>
        </div>
        <div className={styles.cityParent}>
          <div className={styles.cityWrapper}>
            <div className={styles.city}>City*</div>
          </div>
          <div className={styles.cityInput}>
            <img
              className={styles.cityInputChild}
              alt=""
              src="/rectangle-6.svg"
            />
            <div className={styles.rectangleContainer}>
              <div className={styles.frameInner} />
              <input
                className={[styles.bhk1, styles.commonInput].join(" ")}
                placeholder="City"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className={styles.propertyOptionsContentParent}>
          <div className={styles.propertyOptionsContent}>
            <div className={styles.primaryOptions}>
              <div className={styles.primaryOptionButtons}>
                <div className={styles.typeWrapper}>
                  <div className={styles.type}>Type*</div>
                </div>
                <div className={styles.rectangleParent}>
                  <div className={styles.frameChild} />
                  <select
                    className={styles.type1}
                    value={propertyType}
                    onChange={handleTypeChange}
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
              <div className={styles.primaryOptionButtons1}>
                <div className={styles.statusWrapper}>
                  <div className={styles.status}>Status*</div>
                </div>
                <div className={styles.rectangleGroup}>
                  <div className={styles.frameItem} />
                  <select className={styles.status1}>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
              </div>
              <div className={styles.primaryOptionButtons2}>
                <div className={styles.bhkWrapper}>
                  <div className={styles.bhk}>Purpose*</div>
                </div>
                <div className={styles.rectangleContainer}>
                  <div className={styles.frameInner} />
                  <select className={styles.bhk1}>
                    <option value="rent">Rent</option>
                    <option value="pg/coliving">PG/Coliving</option>
                  </select>
                </div>
              </div>
              {propertyType === "residential" && (
                <div className={styles.primaryOptionButtons2}>
                  <div className={styles.bhkWrapper}>
                    <div className={styles.bhk}>BHK*</div>
                  </div>
                  <div className={styles.rectangleContainer}>
                    <div className={styles.frameInner} />
                    <input
                      className={[styles.bhk1, styles.commonInput].join(" ")}
                      placeholder="BHK"
                      type="text"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.secondaryOptions}>
              <div className={styles.secondaryOptionButtons}>
                <div className={styles.listingContent}>
                  <div className={styles.area}>Area (in sq. m)*</div>
                  <div className={styles.rectangleContainer}>
                    <div className={styles.frameInner} />
                    <input
                      className={[styles.bhk1, styles.commonInput].join(" ")}
                      placeholder="Area"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceWrapper}>
              <div className={styles.price}>Price*</div>
              <div className={styles.priceInput}>
                <img
                  className={styles.priceInputChild}
                  alt=""
                  src="/rectangle-6.svg"
                />
                <div className={styles.rectangleContainer}>
                  <div className={styles.frameInner} />
                  <input
                    className={[styles.bhk1, styles.commonInput].join(" ")}
                    placeholder="Price"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className={styles.amenitiesWrapper}>
              <div className={styles.amenities}>Amenities*</div>
              <div className={styles.amenitiesInput}>
                <img
                  className={styles.amenitiesInputChild}
                  alt=""
                  src="/rectangle-6.svg"
                />
                <div className={styles.rectangleContainer}>
                  <div className={styles.frameInner} />
                  <input
                    className={[styles.bhk1, styles.commonInput].join(" ")}
                    placeholder="Amenities"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeStatusOptions;
