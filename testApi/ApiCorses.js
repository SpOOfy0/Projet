const axios = require('axios');

// Remplacez YOUR_ACCESS_TOKEN par votre propre token d'authentification Open edX
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

// Endpoint pour récupérer une liste de tous les cours
const COURSES_ENDPOINT = 'https://YOUR_OPENEDX_INSTANCE.com/api/courses/v1/courses/';

// Configuration pour les requêtes HTTP
const axiosConfig = {
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
};    

// Fonction pour récupérer une liste de tous les cours
async function getAllCourses() {
  try {
    const response = await axios.get(COURSES_ENDPOINT, axiosConfig);
    const courses = response.data.results;
    return courses;
  } catch (error) {
    console.error(error);
  }
}

// Exemple d'utilisation de la fonction getAllCourses
getAllCourses().then(courses => {
  console.log(courses);
});
