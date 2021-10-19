export const environment = {
  production: true,
  hmr: false,
  host: 'https://api.tiepsuc.vn/api/v1',
  googleApiKey: 'AIzaSyAnCQ9qgDE8waZ0zAPG-d-QPFSkfIgSH1Q',
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
