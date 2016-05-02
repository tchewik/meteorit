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
		var postId = this.id;
		var user = Meteor.user();
		if (!user){
			$("#"+postId + " .rating-field .warning .only-for-users").fadeIn(1000);
   			$("#"+postId + " .rating-field .warning .only-for-users").fadeOut(1000);
   			return;
		}

		var arrayOfVoted = Posts.findOne({"_id": postId}).rating.voted;
		var alreadyVoted = false;
		arrayOfVoted.forEach(function(item, i, arr) {
			if (item == user._id)
		    	alreadyVoted = true;
   		});
   		if (alreadyVoted){
   			$("#"+postId + " .rating-field .warning .one-user-one-vote").fadeIn(1000);
   			$("#"+postId + " .rating-field .warning .one-user-one-vote").fadeOut(1000);
   			return;
   		}

   		if (user.username == Posts.findOne({"_id": postId}).author){
  			$("#"+postId + " .rating-field .warning .do-not-vote-yourself").fadeIn(1000);
   			$("#"+postId + " .rating-field .warning .do-not-vote-yourself").fadeOut(1000);
      		return;
  		}

  		var rating = $(event.currentTarget).data("userrating");
		if (rating){
			Meteor.call('postRating', postId, rating);
			return;
		}

		console.log("rating:::что-то пошло не так");
	}
});