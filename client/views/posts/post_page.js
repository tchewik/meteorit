Template.postPage.helpers({
	comments: function() {
		return Comments.find({postId: this._id}, {sort:	{'submitted': 1}});
	},
	text: function() {
		return text.replace(/((https?|ftps?|file|smb):\/\/[a-z.:/]+)/gi, '<a href="$1">$1</a>');
	}
});