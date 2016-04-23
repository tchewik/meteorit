Template.postsList.helpers({
	posts: function(){
		return Posts.find({}, {sort: {submitted: -1}});	//курсор, в случае обновления Posts (-> posts.js) обновит main.html
	}
});