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
	rValue: function(){
		return Math.round(this.rating.rValue * 100)/100;
	}
});

Template.postItem.events({
	'click #js-del-btn':function(event){
		var postId = this._id;
		$("#"+postId).hide('slow', function(){
			Meteor.call('postRemove', postId);
		})		
	},
	'click .js-rate':function(event){
		var rating = $(event.currentTarget).data("userrating");
		if (rating){		
			var postId = this.id;
			var user = Meteor.user();

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

			Meteor.call('postRating', postId, rating);
			return;
		}
		alert("Зайдите на сайт, чтобы голосовать");
	}
});