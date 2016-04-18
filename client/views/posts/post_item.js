Template.postItem.helpers({
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});

Template.postItem.events({
	'click #js-del-btn':function(event){
		alert("post_item вещает: " + this._id);
		//$(event.target).css("width", "500px"); //меняет свойства кнопки
		var postId = this._id;
		Meteor.call('postRemove', post, function(error) {
			console.log("postRemove вещает: ");
			if (error)
				return alert(error.reason);
		});
	},
})



/*
$("#js-del-btn").click(function(){
	alert("post_item says: js-del-btn is clicked");
	Posts.remove(_id);
});
*/