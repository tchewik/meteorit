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
  	return Posts.remove({"_id": postId});
  },

  postRating: function(postId, rating) {
  	console.log("posts.js вещает:");
  	var user = Meteor.user();
  	var post = Posts.findOne({"_id": postId});

  	if (user.username == Posts.findOne({"_id": postId}).author){
  		console.log("это твой пост!");
  	}

  	console.log("user "+user._id+" set "+ postId + " rating: " + rating);
  	var newSummvalue = post.rating.summvalue + rating;
  	console.log("newSummvalue: "+newSummvalue);
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