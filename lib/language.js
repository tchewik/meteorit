Meteor.methods({
	setLang: function(lang){
		if (this.userId){
			Meteor.users.update({_id: this.userId}, {
				$set: {'profile.lang': lang}
			});
		}
		return i18n.setLanguage(lang);
	}
});