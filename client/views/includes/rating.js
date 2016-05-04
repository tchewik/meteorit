Template.rating.helpers({
	rValue: function() {
		return Math.round(this.rating.rValue * 100)/100;
	},
	acceptMutable: function(){
		if (Meteor.user()) {
			var iAmAuthor = this.author == Meteor.user().username;
			var iVoted = false;
			var arrayOfVoted = Posts.findOne({"_id": this._id}).rating.voted;
			arrayOfVoted.forEach(function(item, i, arr) {
				if (item == Meteor.user()._id)
			    	iVoted = true;
	   		});
			return !(iAmAuthor || iVoted);
		} else return false;
	},
})