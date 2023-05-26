// Create a new URL object to make API requests
var url = new URL("http://localhost:3001/api/clients/all");

async function getCorsesFromUser(UserId) {
    // Define a new URL object to make API requests
    var url = new URL("http://localhost:3001/api/clients/all");
    // Add the id parameter to the URL object
    url.searchParams.append("id", UserId);
    // Make a GET request to the API
    const response = await fetch(url);
    // Parse the JSON response
    const data = await response.json();
    // Return the array of courses
    return data.courses;
}

async function createCompletedCoursesElements(userId) {
    const finishTab = document.getElementById('ex1-tabs-4');
  
    if (finishTab) {
      const courses = await getCorsesFromUser(userId);
  
      if (Array.isArray(courses)) {
        courses.forEach(course => {
          const courseItem = document.createElement('div');
          courseItem.className = 'course-item';
          courseItem.textContent = course;
  
          finishTab.appendChild(courseItem);
        });
      } else {
        console.error("Les cours récupérés ne sont pas au format attendu.");
      }
    } else {
      console.error("L'élément avec l'ID 'ex1-tabs-4' n'a pas été trouvé.");
    }
  }
  
  // Appel de la fonction lorsque le DOM est chargé
  window.addEventListener('DOMContentLoaded', async (event) => {
  await createCompletedCoursesElements("1621523536789");
});
