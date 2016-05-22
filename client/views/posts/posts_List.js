Template.postsList.helpers({
	posts: function(){
		return Posts.find({}, {sort: 
								{'rating.rValue': -1	// по убыванию рейтинга
								}});	
	}
});