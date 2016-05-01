Meteor.methods({
	reset_all_all_reset: function() {
		Posts.remove();
	}
})