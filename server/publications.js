// posts --> post_List.js
Meteor.publish('posts', function(){
	return Posts.find({}, {});
});

Meteor.publish('comments', function() {
	return Comments.find();
});