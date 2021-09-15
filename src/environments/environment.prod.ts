export const environment = {
  production: true,
  hmr: false,
  host: 'https://sos-api.3exp8.network/api/v1',
  googleApiKey: 'AIzaSyBvYXrHhLWYyrAywQ-LvZXY1Vy8149azIc',
  s3: {
    AccessKeyId: '',
    Secret: '',
  },
  mapStyle: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};
