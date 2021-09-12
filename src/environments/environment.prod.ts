export const environment = {
  production: true,
  hmr: false,
  host: 'http://54.69.39.96/api/v1',
  googleApiKey: '-d-QPFSkfIgSH1Q',
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
