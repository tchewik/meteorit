setLang = function(lang) {
	Session.set('lang', lang); // записать язык пользователя в сессию
	TAPi18n.setLanguage(lang)
		.done(function() {
			Session.set("showLoadingIndicator", false);
			// Meteor.render(Meteor.loadingTemplate);
		})
		.fail(function (error_message) {
			console.log("language.js says: "+error_message);
		});
	Meteor.call('setLang', lang);	// запись языка в бд
	Cookie.set('lang',lang);	// запись языка в куки
}

function prepareUserLanguage() {
	Session.set("showLoadingIndicator", true);
	var user = Meteor.user();
	if (user) {
		// Если пользователь авторизован, пробуем взять язык из бд
		if (user.profile.lang) {
			setLang(user.profile.lang);
			return;
		}
	}
	var cookie = Cookie.get('lang');
	if (cookie) {
		// Пробуем взять язык из куков
		setLang(cookie);
		return;
	}

	// если нет ни в бд, ни в куках, то определим его через freegeoip.net
	console.log("чужой код с ajax из language.js пошел в ход");
	$.ajax({
        url: '//ipinfo.io',
        type: 'POST',
        dataType: 'jsonp',
        success: function (location) {
            if (location) {
            	console.log(location);
                var lang;
                if (location.country_code == "RU" || location.country_code == "UA" || location.country_code == "KZ" || location.country_code == "BY")
                    lang = "ru";
                else
                    lang = "en";
 
                setLang(lang);
            }
        }
    });
};

Meteor.startup(function(){
	prepareUserLanguage();
});