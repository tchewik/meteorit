import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Accounts.onCreateUser(function(options, user) {
	if (options.username)
		user.profile = {
			name: options.username
		}
	return user;
})