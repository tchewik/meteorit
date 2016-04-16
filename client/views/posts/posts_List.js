Template.postsList.helpers({
	posts: function(){
		return Posts.find();	//курсор, в случае обновления Posts (-> posts.js) обновит main.html
	}
});