var mongoose = require('mongoose');
var Potato = mongoose.model('Potato', Role);

var potatoBag = [/* a humongous amount of potato objects */];

Potato.collection.insert(potatoBag, onInsert);

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d potatoes were successfully stored.', docs.length);
    }
}

module.exports = {
  insertRoles: function(mongoose) {
    // Call static model method to get tweets in the db
    var Roles = [
    	{
			title : "LIMS Developer",
			description : "LIMS Developer"
    	}
    ];
	var Role = mongoose.model('Role');
	Role.collection.insert(Roles, onInsert);
	function onInsert(err, docs) {
	    if (err) {
	        // TODO: handle error
	    } else {
	        console.info('%d potatoes were successfully stored.', docs.length);
	    }
	}

  },
}