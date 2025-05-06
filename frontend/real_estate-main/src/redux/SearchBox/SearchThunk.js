export const searchSuggestionsThunk = async (url, searchTerm, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:8000/api/allproperty`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const properties = await response.json();
    const buyProperties = properties.filter(
      (property) => property.purpose === "sell"
    );
    return buyProperties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

export const getFilteredPropertiesThunk = async (url, filters, ThunkAPI) => {
  const {
    City = "",
    PropertyType = [],
    minArea = 0,
    maxArea = Infinity,
    minPrice = 0,
    maxPrice = Infinity,
    noOfBedrooms = [],
    verifiedProperties = false,
  } = filters;
  console.log("filtrs");
  console.log(filters);

  try {
    if (filters.url !== "") {
      const response = await fetch(filters.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const properties = await response.json();
      const filteredProperties = properties.filter((property) => {
        const isCityMatch =
          filters.City === "" ||
          filters.City === "None" ||
          property.city.toLowerCase() === filters.City.toLowerCase();

        const isPropertyTypeMatch =
          filters.PropertyType.length === 0 ||
          filters.PropertyType.includes(property.type);
        const isAreaMatch =
          property.area >= minArea && property.area <= maxArea;
        const isPriceMatch =
          property.price >= minPrice && property.price <= maxPrice;

        // Handle the number of bedrooms filter
        const isnoOfBedroomsMatch =
          filters.noOfBedrooms.length === 0 ||
          filters.noOfBedrooms.includes(property.Bhk);
        const isVerified =
          filters.verifiedProperties === false ||
          (property.verification === "verified" &&
            filters.verifiedProperties === true);
        return (
          isCityMatch &&
          isPropertyTypeMatch &&
          isAreaMatch &&
          isPriceMatch &&
          isnoOfBedroomsMatch &&
          isVerified
        );
      });

      return filteredProperties;
    } else {
      const properties = filters.searchproperties;
      const filteredProperties = properties.filter((property) => {
        const isCityMatch =
          filters.City === "" ||
          filters.City === "None" ||
          property.city.toLowerCase() === filters.City.toLowerCase();

        const isPropertyTypeMatch =
          filters.PropertyType.length === 0 ||
          filters.PropertyType.includes(property.type);
        const isAreaMatch =
          property.area >= minArea && property.area <= maxArea;
        const isPriceMatch =
          property.price >= minPrice && property.price <= maxPrice;

        // Handle the number of bedrooms filter
        const isnoOfBedroomsMatch =
          filters.noOfBedrooms.length === 0 ||
          filters.noOfBedrooms.includes(property.Bhk);
        const isVerified =
          filters.verifiedProperties === false ||
          (property.verification === "verified" &&
            filters.verifiedProperties === true);
        return (
          isCityMatch &&
          isPropertyTypeMatch &&
          isAreaMatch &&
          isPriceMatch &&
          isnoOfBedroomsMatch &&
          isVerified
        );
      });

      return filteredProperties;
    }
    // return buyProperties;
    // return pr;
  } catch (error) {
    console.error("Error fetching properties:", error);
    // Optionally, you can return an empty array or a default value in case of an error
    return [];
  }
};

// export const getFilteredPropertiesThunk = async (
//   url,
//   filters,
//   purpose,
//   ThunkAPI
// ) => {
//   const {
//     city = "",
//     propertyType = [],
//     minArea = 0,
//     maxArea = Infinity,
//     minPrice = 0,
//     maxPrice = Infinity,
//   } = filters;

//   console.log("filters");
//   console.log(filters);
//   console.log("purpose");
//   console.log(purpose);

//   try {
//     const response = await fetch(
//       `http://localhost:8000/api/allproperty?purpose=${purpose}`
//     );
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const properties = await response.json();

//     const filteredProperties = properties.filter((property) => {
//       const isCityMatch = !city || property.city === city;
//       const isPropertyTypeMatch =
//         propertyType.length === 0 ||
//         propertyType.includes(property.propertyType);
//       const isAreaMatch = property.area >= minArea && property.area <= maxArea;
//       const isPriceMatch =
//         property.price >= minPrice && property.price <= maxPrice;

//       return isCityMatch && isPropertyTypeMatch && isAreaMatch && isPriceMatch;
//     });

//     return filteredProperties;
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     return [];
//   }
// };
