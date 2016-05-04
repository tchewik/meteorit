Meteor.startup(function() {
	Session.set('loading');
});

Template.postItem.helpers({
	containsAuthor: function(){
		if (this.author)
			return true;
		return false;
	},
	containsTime: function(){
		if (this.submitted)
			return true;
		return false;
	},
	submittedText: function(){
		return new Date(this.submitted).toLocaleString();
	},
	ownPost: function(){
		return this.author == Meteor.user().username;
	}
});