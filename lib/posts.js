Posts = new Mongo.Collection('posts');


ownDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Posts.allow({
  update: ownDocument,
  remove: ownDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
})

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      text: String
    });
    
    var postWithSameText = Posts.findOne({text: postAttributes.text});
    if (postWithSameText) {
      return {
        postExists: true,
        _id: postWithSameText._id
      }
    }
    
    var user = Meteor.user();
    var post = _.extend(_.pick(postAttributes, 'url', 'message'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),      
      'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3.0
  				 }
    });

    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },

  postRemove: function(postId) {
    var user = Meteor.user();
    console.log("deleted ::: " + postId);
    if (user.username == Posts.findOne({"_id": postId}).author){
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