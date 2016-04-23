Meteor.startup(function() {
	// обращается к местоположению устройства и в зависимости от него выставляет язык
<<<<<<< HEAD
	$.getJSON('http://ipinfo.io', function(userData){
=======
	$.getJSON('//ipinfo.io', function(userData){
>>>>>>> 1cbcffed4120ca7eb9c099483b3399fd3c2aa5d4
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