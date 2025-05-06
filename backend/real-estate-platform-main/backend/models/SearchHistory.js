const mongoose = require("mongoose");

const SearchEntrySchema = new mongoose.Schema({
  search_text: String,
  search_datetime: {
    type: Date,
    default: Date.now,
  },
});

const SearchHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  searches: [SearchEntrySchema],
});

const Search = mongoose.model("Search", SearchHistorySchema);

module.exports = Search;
