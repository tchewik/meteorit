Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	update: function(userId, doc, fieldNames) {
		var ownsDocument = userId === doc.userId;
		return ownsDocument && fieldNames.length === 1	&& fieldNames[0] === 'read';
	}
});

createCommentNotification = function(comment) {
	var post = Posts.findOne(comment.postId);
	if (comment.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: comment._id,
			commenterName: comment.author,
			read: false
		});
	}
};

Meteor.methods({
	notificationsClear: function() {
		Notifications.remove({"read": true});
	}
});