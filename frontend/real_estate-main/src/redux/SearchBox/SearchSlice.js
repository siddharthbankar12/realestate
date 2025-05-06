import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFilteredPropertiesThunk,
  searchSuggestionsThunk,
} from "./SearchThunk";
import { toast } from "react-toastify";

const initialState = {
  expanded: [
    "panel1",
    "panel2",
    "panel3",
    "panel4",
    "panel5",
    "panel6",
    "panel7",
    "panel8",
    "panel9",
  ],
  city: "",
  recentSearchCities: [],
  searchOption: "Buy",
  budgetRange: [0, 2000000000],
  noOfBedrooms: [],
  propertyType: [],
  area: [0, 400000000],
  withPhotos: false,
  reraApproved: false,
  verifiedProperties: false,
  amenities: [],
  constructionStatus: [],
  postedBy: [], // Ensure this is included in the initial state
  furnitureType: [], // Ensure this is included in the initial state
  purchaseType: [], // Ensure this is included in the initial state
  isSuggestionsLoading: false,
  suggestions: [],
  properties: [],
  isPropertyLoading: false,
};

export const searchSuggestions = createAsyncThunk(
  "search/searchSuggestions",
  async (city, thunkAPI) => {
    return searchSuggestionsThunk("/Search", city, thunkAPI);
  }
);

export const getFilteredProperties = createAsyncThunk(
  "properties/getFilteredProperties",
  async (filters, ThunkAPI) => {
    return getFilteredPropertiesThunk(
      "/PostForm/details/Filter",
      filters,
      ThunkAPI
    );
  }
);

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleCity: (state, { payload }) => {
      state.city = payload;

      // Update recentSearchCities
      if (payload && typeof payload === "string") {
        const updated = state.recentSearchCities.filter(
          (city) => city !== payload
        );
        updated.unshift(payload); // Add new city at the beginning
        state.recentSearchCities = updated.slice(0, 4); // Keep only last 4
      }
    },

    updateFilters: (state, { payload }) => {
      const filters = {
        ...state,
        ...payload,
      };
      // Dispatch getFilteredProperties with updated filters
      return filters;
    },
    handleChange: (state, { payload }) => {
      if (state.expanded.includes(payload)) {
        const arr = state.expanded.filter((item) => item !== payload);
        return { ...state, expanded: arr };
      } else {
        return { ...state, expanded: [...state.expanded, payload] };
      }
    },
    handleSearchOption: (state, { payload }) => {
      state.searchOption = payload;
    },
    handleBudgetRange: (state, { payload }) => {
      state.budgetRange = payload;
    },

    handleNoOfBedrooms: (state, { payload }) => {
      if (state.noOfBedrooms.includes(payload)) {
        const arr = state.noOfBedrooms.filter((item) => item !== payload);
        return { ...state, noOfBedrooms: arr };
      } else {
        return { ...state, noOfBedrooms: [...state.noOfBedrooms, payload] };
      }
    },
    handlePropertyType: (state, { payload }) => {
      if (state.propertyType.includes(payload)) {
        const arr = state.propertyType.filter((item) => item !== payload);
        return { ...state, propertyType: arr };
      } else {
        return { ...state, propertyType: [...state.propertyType, payload] };
      }
    },
    handleArea: (state, { payload }) => {
      state.area = payload;
    },
    handleWithPhotos: (state) => {
      state.withPhotos = !state.withPhotos;
    },
    handleReraApproved: (state) => {
      // Ensure this is included
      state.reraApproved = !state.reraApproved;
    },
    handleVerifiedProperties: (state) => {
      state.verifiedProperties = !state.verifiedProperties;
    },
    handleAmenities: (state, { payload }) => {
      if (state.amenities.includes(payload)) {
        const arr = state.amenities.filter((item) => item !== payload);
        return { ...state, amenities: arr };
      } else {
        return { ...state, amenities: [...state.amenities, payload] };
      }
    },
    handleConstructionStatus: (state, { payload }) => {
      if (state.constructionStatus.includes(payload)) {
        const arr = state.constructionStatus.filter((item) => item !== payload);
        return { ...state, constructionStatus: arr };
      } else {
        return {
          ...state,
          constructionStatus: [...state.constructionStatus, payload],
        };
      }
    },
    handlePostedBy: (state, { payload }) => {
      // Ensure this is included
      if (state.postedBy.includes(payload)) {
        const arr = state.postedBy.filter((item) => item !== payload);
        return { ...state, postedBy: arr };
      } else {
        return { ...state, postedBy: [...state.postedBy, payload] };
      }
    },
    handleFurnitureType: (state, { payload }) => {
      // Ensure this is included
      if (state.furnitureType.includes(payload)) {
        const arr = state.furnitureType.filter((item) => item !== payload);
        return { ...state, furnitureType: arr };
      } else {
        return { ...state, furnitureType: [...state.furnitureType, payload] };
      }
    },
    handlePurchaseType: (state, { payload }) => {
      // Ensure this is included
      if (state.purchaseType.includes(payload)) {
        const arr = state.purchaseType.filter((item) => item !== payload);
        return { ...state, purchaseType: arr };
      } else {
        return { ...state, purchaseType: [...state.purchaseType, payload] };
      }
    },
    updateSuggestions: (state, { payload }) => {
      state.suggestions = payload;
    },
    updateProperties: (state, { payload }) => {
      state.properties = payload;
    },
    clearSearchState: (state) => initialState,
    handleSearchCity: (state, { payload }) => {
      if (typeof payload === "string") {
        return {
          ...state,
          city: { title: payload },
        };
      } else if (payload && payload.inputValue) {
        return {
          ...state,
          city: { title: payload.inputValue },
        };
      } else {
        return { ...state, city: payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSuggestions.pending, (state) => {
        state.isSuggestionsLoading = true;
      })
      .addCase(searchSuggestions.fulfilled, (state, { payload }) => {
        state.isSuggestionsLoading = false;
        const suggestMap = new Map();
        for (let item of payload) {
          suggestMap.set(item.address, item.address);
          suggestMap.set(item.city, item.city);
          suggestMap.set(item.state, item.state);
        }
        state.suggestions = Array.from(suggestMap.values()).map((address) => ({
          address,
        }));
      })
      .addCase(searchSuggestions.rejected, (state, { payload }) => {
        state.isSuggestionsLoading = false;
        toast.error(payload.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(getFilteredProperties.pending, (state) => {
        state.isPropertyLoading = true;
      })
      .addCase(getFilteredProperties.fulfilled, (state, { payload }) => {
        state.isPropertyLoading = false;
        state.properties = payload;
      })
      .addCase(getFilteredProperties.rejected, (state, { payload }) => {
        state.isPropertyLoading = false;
        console.log(payload);
      });
  },
});

export const {
  handleSearchOption,
  handleBudgetRange,
  handleNoOfBedrooms,
  handlePropertyType,
  handleArea,
  handleWithPhotos,
  handleAmenities,
  handleConstructionStatus,
  handleChange,
  clearSearchState,
  handleSearchCity,
  handleReraApproved,
  handleVerifiedProperties,
  handlePostedBy,
  handleFurnitureType,
  handlePurchaseType,
  updateFilters,
  handleCity,
} = SearchSlice.actions;
export default SearchSlice.reducer;
