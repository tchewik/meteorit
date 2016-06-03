Template.langWarningTemplate.helpers({
	firstLanguage: function() {
		var lang = Meteor.user().profile.lang;
		if (lang == 'en')
			return 'russian';
		else
			return 'english';
	},
	secondLanguage: function() {
		var lang = Meteor.user().profile.lang;
		if (lang == 'he')
			return 'russian';
		else 
			return 'hebrew';
	}
})

Template.langWarningTemplate.events({
	'click .lang1':function(event){
		var lang = Meteor.user().profile.lang;
		if (lang == 'en')
			Meteor.call('setLang', 'ru');	
		else
			Meteor.call('setLang', 'en');
	},
	'click .lang2':function(event){
		var lang = Meteor.user().profile.lang;
		if (lang == 'he')
			Meteor.call('setLang', 'ru');
		else
			Meteor.call('setLang', 'he');
	},
	'click .close': function(event){
		$(".lang-warning").hide("normal");
		$(".lang-warning-place").css("padding-top", "0em");
	},
});

Template.langWarningTemplate.onCreated(function(){
	$(window).on('scroll', function(e) {
		var y = $("body").scrollTop();
		var opacity = 1 - 0.0008*y;
		$(".lang-warning").css("opacity",opacity); 
		$(".lang-warning").css("z-index",Math.floor(opacity*100));
	})
});