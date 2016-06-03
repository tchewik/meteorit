if (Meteor.isClient) {
  ShareIt.init({
    siteOrder: ['facebook', 'twitter'],
    sites: {
      'facebook': {
        'appId': '1162680410433134',
        'version': 'v2.3'
      }
    },
    iconOnly: true,
    applyColors: false
  });
} 