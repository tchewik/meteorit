Template.postsList.helpers({
	posts: function(){
		return Posts.find({}, {sort: 
								{'rating.rValue': -1,	// по убыванию рейтинга
								 'submitted': 1	// по убыванию даты публикации
								}});	
	}
});