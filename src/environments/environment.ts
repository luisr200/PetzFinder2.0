// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    apiEnpoint: 'https://3aq8h6y40a.execute-api.us-west-2.amazonaws.com/stage',
    cognitoEndpoint: 'https://petzfinder.auth.us-west-2.amazoncognito.com/oauth2/',
    cognitoClientId: '4027a33cqbdv9bf9n16q7jb3bh',
    //cognitoClientId: '1e9bjqcg835vr3aui4cvtmtnlu',
    //Must be the same as the origin request
    cognitoredirectUrl: 'https://localhost:4200/callback',
    cognitoGrantType: 'authorization_code',
    cognitoScope: 'email+phone+openid+aws.cognito.signin.user.admin+profile',
    cognitoLoginPage: `https://petzfinder.auth.us-west-2.amazoncognito.com/login`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
