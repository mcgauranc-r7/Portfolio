var mongoose = require('mongoose');
var roleSchema = require("model/RoleSchema")
schema.statics.getRoles = function(page, skip, callback) {
  var tweets = [],
      start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  Role.find().exec(function(err,docs){

    if(!err) {
      tweets = docs;  // We got tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // Set them to active
      });
    }
    // Pass them back to the specified callback
    callback(tweets);

  });

};
// Return a Tweet model based upon the defined schema
module.exports = Role = mongoose.model('Role', roleSchema);
