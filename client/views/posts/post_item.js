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
		var username = Meteor.user().username || Meteor.user().profile.name;
		return this.author === username;
	},
	shareData: function() {
		return {
			title: this.title + " @"+this.author,
			url: "https://tcheblog.herokuapp.com/"+this._id,
		}
	}
});