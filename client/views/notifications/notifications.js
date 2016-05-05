Template.notifications.helpers({
	notificationCount: function() {
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
	},
	notifications: function() {
		return Notifications.find({userId: Meteor.userId(), read: false});
	}
});

Template.notificationItem.helpers({
	notificationPostPath: function() {
		return Router.routes.postPage.path({_id: this.postId});
	}
});

Template.notificationItem.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read: true}});
	}
});