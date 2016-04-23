Template.postItem.helpers({
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});

Template.postItem.events({
	'click #js-del-btn':function(event){
		var postId = this._id;
		$("#"+postId).hide('slow', function(){
			Meteor.call('postRemove', postId);	// эти методы в /lib/posts.js
		})		
	},
	'click .js-rate':function(event){
		var rating = $(event.currentTarget).data("userrating");
		console.log("post_item.js says: " + rating);
		var postId = this.id;
		Meteor.call('postRating', postId, rating);
	}
});