export const environment = {
    production: true,
    hmr       : false,
    apiEnpoint: 'https://3aq8h6y40a.execute-api.us-west-2.amazonaws.com/stage',
    cognitoEndpoint: 'https://petzfinder.auth.us-west-2.amazoncognito.com/oauth2/',
    cognitoClientId: '4027a33cqbdv9bf9n16q7jb3bh',
    //cognitoClientId: '1e9bjqcg835vr3aui4cvtmtnlu',
    //Must be the same as the origin request
    cognitoredirectUrl: 'https://petzfinder.net/callback',
    cognitoGrantType: 'authorization_code',
    cognitoScope: 'email+phone+openid+aws.cognito.signin.user.admin+profile',
    cognitoLoginPage: `https://petzfinder.auth.us-west-2.amazoncognito.com/login`
};
