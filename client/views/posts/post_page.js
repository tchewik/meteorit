Template.postPage.helpers({
	comments: function() {
		return Comments.find({postId: this._id}, {sort:	{'submitted': 1}});
	},
});

Template.postPage.events({
	'click .go-back':function(event){
		history.back();
	}
});