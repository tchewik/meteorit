Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
  	return [Meteor.subscribe('notifications')]
  }
});

Router.map(function() {
  this.route('postPage', {
  	path: '/posts/:_id',
    waitOn: function() {
      return Meteor.subscribe('comments', this.params._id);
    },
   	data: function()  { return Posts.findOne(this.params._id); }
  });

  this.route('postSubmit', {
    path: '/submit'
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() {  return Posts.findOne(this.params._id);  }
  });

  this.route('postsList', {
    path: '/:postsLimit?',
    waitOn: function() {
      var limit = parseInt(this.params.postsLimit) || 5;
      return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
    },
    data: function() {
      var limit = parseInt(this.params.postsLimit) || 5;
      return {
        posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
      };
    }
  });
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    pause();
  } else {
    this.next();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() { clearErrors(); this.next(); });