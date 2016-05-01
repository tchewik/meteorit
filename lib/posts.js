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
    var postToExtend = Posts.findOne();
    var post = _.extend(this, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),  
      title: postAttributes.title,
      text: postAttributes.text,    
      'rating': {
    	 		'summvalue': 0,
  				'voted': [],
  				'rValue': 0
  				 }
    });

    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },

  postRemove: function(postId) {
    var user = Meteor.user();
    if (user.username == Posts.findOne({"_id": postId}).author){
      Posts.remove({"_id": postId});
    }
  },

  postRating: function(postId, rating) {
  	var user = Meteor.user();
  	var post = Posts.findOne({"_id": postId});

  	if (user.username == Posts.findOne({"_id": postId}).author){
  		console.log("это твой пост!");
      return;
  	}

    /*
    if (inArray(user._id, Posts.findOne({"_id": postId}).rating.voted) != -1){
      console.log(Posts.findOne({"_id": postId}).rating.voted);
      console.log("Уже голосовал!");
      return; 
    }
    */

    var arrayOfVoted = Posts.findOne({"_id": postId}).rating.voted;
    var alreadyVoted = false;
    arrayOfVoted.forEach(function(item, i, arr) {
      if (item == user._id){
        alreadyVoted = true;
      }
    })
    if (alreadyVoted){
      console.log("ты уже голосовал, голуба!");
      return;
    }

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
  },
});