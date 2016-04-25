if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/',      
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',      
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',      
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });

  Posts.insert({
    title: 'Tchwitter',
    url: 'http://twitter.com/tchewik',      
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });
}