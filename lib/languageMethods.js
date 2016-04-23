Meteor.methods({
	"setLang": function(lang){
		if (!this.userId)
			return;
		Meteor.users.update({_id: this.userId}, 
							{$set: {'profile.lang': lang}}
							);
	}
});