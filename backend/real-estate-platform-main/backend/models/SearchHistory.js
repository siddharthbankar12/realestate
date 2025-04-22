const mongoose=require("mongoose")

const SearchHistorySchema =  new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    search_terms: {
        type: [String],
        default: []
    },
    search_date: {
        type: Date,
        default: Date.now
    }
})

const Search = mongoose.model("Search", SearchHistorySchema);

module.exports = Search;