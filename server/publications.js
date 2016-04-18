/*
Meteor.publish('posts', function(author){
	return Posts.find({author: author}); // Корень зла!
});
*/

Meteor.publish('posts', function(){
	return Posts.find();
});