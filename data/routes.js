var Role = require('../model/Role'), roleSchema = require("../model/schema/RoleSchema")
module.exports = {
  create : function(req, res) {
	var rs = new roleSchema(req.body); 
	rs.save( function(error, data){
		if(error){
			res.json(error);
		}
		else{
			res.json(data);
		}
	});
  },
  read: function(req, res) {
    // Call static model method to get tweets in the db
    Role.schema.statics.getRoles(0,0, function(roles, pages) {
	  console.log("executing read")
      // Render our 'home' template
      res.send(roles);
    });
  },
  delete : function(req, res) {
	var id = req.params.id;
 	Role.findById(id, function (err, doc) {
	    if (doc) {
			doc.remove(function(){
			  res.send({
				status : "deleted"
			  });
			}); //Removes the document	   
		} else {
			  res.send({
				status : "not found"
			  });
		}
	})
  }
}