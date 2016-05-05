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
});

Template.rating.events({
	'click .js-rate':function(event){
		event.preventDefault();
		var postId = this.id;
		var user = Meteor.user();
		if (!user){
			throwError("Please, log in");
   			return;
		}

		var arrayOfVoted = Posts.findOne({"_id": postId}).rating.voted;
		var alreadyVoted = false;
		arrayOfVoted.forEach(function(item, i, arr) {
			if (item == user._id)
		    	alreadyVoted = true;
   		});
   		if (alreadyVoted){
   			throwError("You can give only one vote");
   			return;
   		}

   		if (user.username == Posts.findOne({"_id": postId}).author){
   			throwError("Do not vote yourself!");
      		return;
  		}

  		var rating = $(event.currentTarget).data("userrating");
		if (rating){
			Meteor.call('postRating', postId, rating);
			return;
		}
	}
});