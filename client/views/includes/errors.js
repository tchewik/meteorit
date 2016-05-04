Template.errors.helpers({
	errors: function()	{
		return Errors.find();
	}
});

Template.error.onRendered(function() {
	var error = this.data;
	Meteor.defer(function() {
		Errors.update(this._id, {$set: {seen: true}});
	}, 3000);
});