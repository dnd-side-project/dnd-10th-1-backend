// private async setTransport() {
//   const OAuth2 = google.auth.OAuth2;
//   const oauth2Client = new OAuth2(
//     this.configService.get('CLIENT_ID'),
//     this.configService.get('CLIENT_SECRET'),
//     'https://developers.google.com/oauthplayground',
//   );

//   oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN,
//   });

//   const accessToken: string = await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((err, token) => {
//       if (err) {
//         reject('Failed to create access token');
//       }
//       resolve(token);
//     });
//   });

//   const config: Options = {
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: this.configService.get('EMAIL'),
//       clientId: this.configService.get('CLIENT_ID'),
//       clientSecret: this.configService.get('CLIENT_SECRET'),
//       accessToken,
//     },
//   };
//   this.mailerService.addTransporter('gmail', config);
// }
