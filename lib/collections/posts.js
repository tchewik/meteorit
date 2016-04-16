Posts = new Mongo.Collection('posts');

Posts.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String,
    });


    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    console.log(postAttributes);

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      //userId: Meteor.user()._id, 
      author: Meteor.user().username, 
      submitted: new Date()
    });

    console.log(post);

    try{
    	var postId = Posts.insert(post);
    } catch (e){
    	console.log(postId);
    }

    return {
      _id: postId
    };
  }
});
