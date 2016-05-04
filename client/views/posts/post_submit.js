Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var postAttributes = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val()
    };
    

    Meteor.call('postInsert', postAttributes, function(error, result) {
      if (error)
        return throwError(error.reason);
    
      if (result.postExists){
      	throwError('This text has already been posted');
      }

      Router.go('postsList');
    });
  }
});