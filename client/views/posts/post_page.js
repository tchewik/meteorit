Template.postPage.helpers({
	comments: function() {
		return Comments.find({postId: this._id});
	},
})
Template.postPage.events({
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
})