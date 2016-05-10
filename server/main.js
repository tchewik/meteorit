import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Accounts.onCreateUser(function(options, user) {
	user.profile = {
		name: options.username
	}
	return user;
})