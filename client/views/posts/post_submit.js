Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var postAttributes = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    //Router.go('postsList');
    Meteor.call('postInsert', postAttributes, function(error, result) {
      // отобразить ошибку пользователю и прерваться
      if (error)
      	return alert(error.reason);

      if (result.postExists)
      	alert('This link has already been posted');
    
      Router.go('postPage', {_id: result._id});  
    });
  }
});