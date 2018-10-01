// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 firebase: {
    apiKey: 'AIzaSyCbUT-EB70TWJvIS5Op03XLH12rzFb-bxI',
    authDomain: 'ng-fitness-tracker-8e014.firebaseapp.com',
    databaseURL: 'https://ng-fitness-tracker-8e014.firebaseio.com',
    projectId: 'ng-fitness-tracker-8e014',
    storageBucket: '',
    messagingSenderId: '368847483263'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
