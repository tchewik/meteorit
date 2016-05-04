Meteor.startup(function() {
	Session.set('loading');	// Чтобы успел загрузиться текущий юзер
	var user = Meteor.user();
	if (user)
		if (user.profile.lang) 
			return i18n.setLanguage(user.profile.lang);	

	var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
  var locale = 'en';
  if (localeFromBrowser.match(/ru/)
  	||localeFromBrowser.match(/uk/)
  	||localeFromBrowser.match(/by/)
  	||localeFromBrowser.match(/kz/))
   	locale = 'ru';
  if (localeFromBrowser.match(/he/))
    locale = 'he';
    
    return Meteor.call('setLang', locale);	
});