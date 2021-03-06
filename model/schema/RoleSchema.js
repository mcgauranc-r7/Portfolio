var mongoose = require('mongoose');
// Create a new schema for our tweet data
var Role = new mongoose.Schema({
    id        		: Number
  , user_id        		: Number
  , title     		: String
  , description     : String
  , skills     		: String
  , body       		: String
  , from       		: Date
  , to       		: Date 
  , company			: String
  , location : String
  , coordinates : String
});

module.exports = mongoose.model("Role",Role);