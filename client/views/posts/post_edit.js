Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      text: $(e.target).find('[name=text]').val(),
    }
    console.log(postProperties);
    console.log(currentPostId);
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var postId = this._id;
      Meteor.call('postRemove', postId)
      Router.go('postsList');
    }
  }
});