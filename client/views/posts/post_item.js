Meteor.startup(function() {
	Session.set('loading');
});

Template.postItem.helpers({
	containsAuthor: function(){
		if (this.author)
			return true;
		return false;
	},
	author: function(){
		if (this.author)
			return this.author;
	},
	containsTime: function(){
		if (this.submitted)
			return true;
		return false;
	},
	submitted: function(){
		return this.submitted.toLocaleString();
	},
	ownPost: function(){
		return this.author == Meteor.user().username;
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
	rValue: function(){
		return Math.round(this.rating.rValue * 100)/100;
	}
});

Template.postItem.events({
	'click #js-del-btn':function(event){
		event.preventDefault();
		var postId = this._id;
		$("#"+postId).hide('slow', function(){
			Meteor.call('postRemove', postId);
		})		
	},
	'click .js-rate':function(event){
		event.preventDefault();
		console.log(event);
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