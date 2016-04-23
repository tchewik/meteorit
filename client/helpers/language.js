Meteor.startup(function() {
	var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
  	var locale = 'en';
  	if (localeFromBrowser.match(/ru/)) {
    	locale = 'ru';
    }
  	i18n.setLanguage(locale);
});