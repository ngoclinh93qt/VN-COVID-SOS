// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.hmr.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { SEC_INFO } from './environment.sec';
export const environment = {
  production: false,
  hmr: true,
  host: 'http://54.69.39.96/api/v1',
  googleApiKey: SEC_INFO.GOOGLE_MAP_API_KEY,
  s3: {
    AccessKeyId: SEC_INFO.S3_ACCESS_KEY,
    Secret: SEC_INFO.S3_SECRET,
    Bucket: SEC_INFO.S3_BUCKET,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
