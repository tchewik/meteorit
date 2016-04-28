if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/', 
    author: 'automatic',     
    submitted: new Date(),
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com',  
    author: 'automatic',     
    submitted: new Date(),    
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com',   
    author: 'automatic',     
    submitted: new Date(),    
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });

  Posts.insert({
    title: 'Tchwitter',
    url: 'http://twitter.com/tchewik',      
    author: 'automatic',     
    submitted: new Date(),
    'rating': {
    	 		'summvalue': 3,
  				'voted': [],
  				'rValue': 3
  				 }
  });
}