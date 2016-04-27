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
      submitted: new Date(),      
      'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },

  postRemove: function(postId) {
    var user = Meteor.user();
    if (user.username == Post.findOne({"_id": postId}).author){
      Posts.remove({"_id": postId});
    }
  },

  postRating: function(postId, rating) {
  	var user = Meteor.user();
  	var post = Posts.findOne({"_id": postId});

  	if (user.username == Posts.findOne({"_id": postId}).author){
  		console.log("это твой пост!");
  	}

  	var newSummvalue = post.rating.summvalue + rating;
  	var newVoted = post.rating.voted;
  	newVoted.push(user._id);
  	var newRValue = newSummvalue / newVoted.length;
  	Posts.update({_id:postId}, 
  				 {$set: {
  				 	'rating': {
  				 		'summvalue': newSummvalue,
  				 		'voted': newVoted,
  				 		'rValue': newRValue
  				 	}
  				 }});
  }
});