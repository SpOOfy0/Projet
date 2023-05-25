const { google } = require('googleapis');

const CLIENT_ID = '367634136132-ijogov49okdns5kjp0s8jl38jasbm2pm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/redirect';
const API_KEY = 'AIzaSyBleWx_5ZPsrc3qMSPqQ9XwSKhjD00ibek';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const scopes = ['https://www.googleapis.com/auth/classroom.courses.readonly', 'https://www.googleapis.com/auth/classroom.rosters.readonly'];

const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

// Créer un serveur HTTP pour écouter les requêtes de redirection
const http = require('http');
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const searchParams = url.searchParams;

  if (searchParams.has('code')) {
    const authCode = searchParams.get('code');

    // Récupérer le jeton d'accès
    oauth2Client.getToken(authCode, (err, token) => {
      if (err) {
        console.error('Erreur lors de la récupération du jeton:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur lors de la récupération du jeton');
        return;
      }

      // Afficher le jeton d'autorisation dans la console
      console.log('Jeton d\'autorisation:', token);

      // Utiliser le jeton d'accès pour récupérer les cours
      const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
      classroom.courses.list({}, (err, response) => {
        if (err) {
          console.error('Erreur lors de la récupération des cours:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erreur lors de la récupération des cours');
          return;
        }

        // Créer une page HTML pour afficher les cours
        let html = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Liste des cours Google Classroom</title>\n</head>\n<body>\n<h1>Liste des cours Google Classroom</h1>\n<ul>\n';

        response.data.courses.forEach(course => {
          html += `<li>${course.name}</li>\n`;
        });

        html += '</ul>\n</body>\n</html>';

        // Envoyer la page HTML en réponse à la requête
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      });
    });
  } else {
    // Rediriger vers l'URL d'autorisation
    res.writeHead(302, { 'Location': authorizeUrl });
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
