const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '367634136132-icqjm0sd7fkc5msoclem1249botv9tp9.apps.googleusercontent.com',
  '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',
  'https://example.com/oauth2callback'
);

const scopes = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.rosters.readonly'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

console.log('Autoriser l\'accès à cette URL:', url);
