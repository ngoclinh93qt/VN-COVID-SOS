import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify'
import { RSA_SSLV23_PADDING } from 'constants';

Amplify.configure({
    Auth: {
        identityPoolId:'us-west-2:45b77489-2a84-4c36-ba40-f68fe13caa7b', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-west-2', // REQUIRED - Amazon Cognito Region
        userPoolId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        AWSS3: {
            bucket: 'hete', //REQUIRED -  Amazon S3 bucket
            region: 'us-west-2', //OPTIONAL -  Amazon service region
        }
    }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
