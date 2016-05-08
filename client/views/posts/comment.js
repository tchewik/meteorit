Template.comment.helpers({
	submittedText: function() {
		return new Date(this.submitted).toLocaleString();
	},
	iAmAuthor: function() {
		return this.userId === Meteor.user()._id;
	}
});

Template.comment.events({
	'click .close':function() {
		Meteor.call('remove', this._id);
	}
});