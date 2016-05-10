import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Accounts.onCreateUser(function(options, user) {
	if (user.username){
		user.profile = {
			name: user.username
		}
		return user;
	}
});