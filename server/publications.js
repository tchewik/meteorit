// posts --> post_List.js
Meteor.publish('posts', function(){
	return Posts.find();
});