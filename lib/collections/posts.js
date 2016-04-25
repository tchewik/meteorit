Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String
    });
    
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },

  postRemove: function(postId) {
  	return Posts.remove({"_id": postId});
  },

  postRating: function(postId, rating) {
  	var user = Meteor.user()._id;
  	console.log("posts.js вещает:");
  	console.log("user "+user+" set "+ postId + " rating: " + rating);
  	Posts.update({_id:postId}, 
  				 {$set: {
  				 	'rating':rating,
  				 	}});
  }
});