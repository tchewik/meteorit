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
    return (_.without(fieldNames, 'text', 'title').length > 0);
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
    var username = user.username || user.profile.name;
    var postToExtend = Posts.findOne();
    var post = _.extend(this, {
      userId: user._id, 
      author: username, 
      submitted: new Date(),  
      title: postAttributes.title,
      text: postAttributes.text,    
      'rating': {
    	 		'summvalue': 0,
  				'voted': [],
  				'rValue': 0
  				 },
      commentsCount: 0
    });

    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },

  postRemove: function(postId) {
    if (Meteor.user()._id === Posts.findOne({"_id": postId}).userId){
      Comments.remove({"postId": postId});
      Posts.remove({"_id": postId});
    }
  },

  postRating: function(postId, rating) {
  	var user = Meteor.user();
  	var post = Posts.findOne({"_id": postId});

  	var newSummvalue = post.rating.summvalue + rating;
  	var newVoted = post.rating.voted;
  	newVoted.push(user._id);
  	var newRValue = newSummvalue / newVoted.length;
  	Posts.update({_id: postId}, 
  				 {$set: {
  				 	'rating': {
  				 		'summvalue': newSummvalue,
  				 		'voted': newVoted,
  				 		'rValue': newRValue
  				 	}
  				 }});
    return 0;
  },
});