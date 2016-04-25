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
		console.log("post_item вещает");
		var rating = $(event.currentTarget).data("userrating");
		var postId = this.id;
		console.log(Posts.find({"_id":this.id}).fetch());
		Meteor.call('postRating', postId, rating);
		console.log(Posts.find({"_id":this.id}).fetch());
	}
});