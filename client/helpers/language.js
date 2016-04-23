Meteor.startup(function() {
	// обращается к местоположению устройства и в зависимости от него выставляет язык
	$.getJSON('http://ipinfo.io', function(userData){
	  console.log(userData);
	  country = userData.country;
	  if (country == 'RU'
	  	  || country == 'UA'
	  	  || country == 'BY'
	  	  || country == 'KZ'){
	  	return i18n.setLanguage('ru');
	  }
	});
	// по умолчанию английский
	i18n.setLanguage('en');
});