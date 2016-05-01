Meteor.methods({
	reset_all_ratings: function() {
		Posts.remove(rating);
	}
})