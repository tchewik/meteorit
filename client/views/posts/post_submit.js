Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var postAttributes = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val()
    };
    

    Meteor.call('postInsert', postAttributes, function(error, result) {
      // отобразить ошибку пользователю и прерваться
      if (error)
      	return alert(error.reason);

      if (result.postExists){
      	$(".warning .do-not-text-it-again").fadeTo(1000, 1);
        $(".warning .do-not-text-it-again").fadeTo(1000, 0);
        //$(".warning.do-not-text-it-again").hide('pulsate', 'slow');
        //$(".warning .do-not-text-it-again").show("fade", 400);
        return;
      }
 
      Router.go('postsList');
    });
  }
});