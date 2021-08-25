export const environment = {
  production: true,
  host: 'http://54.69.39.96/api/v1',
  googleApiKey: 'AIzaSyAnCQ9qgDE8waZ0zAPG-d-QPFSkfIgSH1Q',
  s3: {
    AccessKeyId: 'AKIATKFI4GZN3O23YKCY',
    Secret: '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'
  },
  mapStyle: [
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
};
