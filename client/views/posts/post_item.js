Template.postItem.helpers({
	domain: function(){
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	containsAuthor: function(){
		if (this.author)
			return true;
		return false;
	},
	author: function(){
		if (this.author)
			return this.author;
	},
	containsTime: function(){
		console.log(this);
		if (this.submitted)
			return true;
		return false;
	},
	submitted: function(){
		return this.submitted.toLocaleString();
	},
	ownPost: function(){
		return this.author == Meteor.user().username;
	},
	rValue: function(){
		return Math.round(this.rating.rValue * 100)/100;
	}
});

Template.postItem.events({
	'click #js-del-btn':function(event){
		var postId = this._id;
		$("#"+postId).hide('slow', function(){
			Meteor.call('postRemove', postId);	// эти методы в /lib/posts.js
		})		
	},
	'click .js-rate':function(event){
		var rating = $(event.currentTarget).data("userrating");
		if (rating){		
			var postId = this.id;
			Meteor.call('postRating', postId, rating);
			return;
		}
		alert("Зайдите на сайт, чтобы голосовать");
	}
});

Template.postItem.onRendered(function () {
	console.log(this);
	if (this.data.author != Meteor.user().username){
		console.log("hey ::: "+this.data.author+" != "+Meteor.user().username);
		var post = "#" + this.data._id;
		$('#js-del-btn').toggleClass('disabled');
	}
})
/*
потуги перекрасить посты пользователя, зашедшего на страницу
Template.postItem.onRendered(function () {
	console.log(this);
	if (this.data.author != Meteor.user().username){
		console.log("hey ::: "+this.data.author+" != "+Meteor.user().username);
		var post = "#" + this.data._id;
		$('#js-del-btn').toggleClass('disabled');
	}
})
*/