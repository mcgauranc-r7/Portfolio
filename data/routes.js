var Role = require('../model/Role');
module.exports = {
  index: function(req, res) {
    // Call static model method to get tweets in the db
    Role.getRoles(0,0, function(roles, pages) {

	  console.log("executing read")
      // Render our 'home' template
      res.send(roles);
    });
  }  
}