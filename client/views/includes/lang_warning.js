Template.langWarningTemplate.events({
	'click .switch_lang':function(event){
		var lang = Meteor.user().profile.lang;
		if (lang == 'ru'){
			Meteor.call('setLang', 'en');	
		} else {
			Meteor.call('setLang', 'ru');
		}
	},
	'click .close': function(event){
		$(".lang-warning").hide("normal");
	}

})