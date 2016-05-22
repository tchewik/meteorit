Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
  	return [Meteor.subscribe('notifications')]
  },
  progressSpinner: false
});

PostsListController = RouteController.extend({
   template: 'postsList',
   increment: 5,
   limit: function() {
     return parseInt(this.params.postsLimit) || this.increment;
   },
   findOptions: function() {
     return {sort: {'rating.rValue': -1}, limit: this.limit()};
   },
   subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
   },
   posts: function() {
     return Posts.find({}, this.findOptions());
   },
   data: function() {
     var hasMore = this.posts().fetch().length === this.limit();
     var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
     return {
       posts: this.posts(),
       ready: this.postsSub.ready,
       nextPath: hasMore ? nextPath : null
     };
    }
  });

Router.route('postPage', {
   path: '/posts/:_id',
   waitOn: function() {
     return [Meteor.subscribe('singlePost', this.params._id),
             Meteor.subscribe('comments', this.params._id)];
   },
   data: function()  { return Posts.findOne(this.params._id); }
 });

Router.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() {
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() {  return Posts.findOne(this.params._id);  }
  });

Router.route('postSubmit', {
    path: '/submit',
    disableProgress: true
  });

Router.route('postsList', {
    path: '/:postsLimit?',
    //controller: PostsListController
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

//Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() { clearErrors(); this.next(); });