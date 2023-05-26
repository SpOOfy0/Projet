$(document).ready(function() {
    $('.donne-button').click(function(event) {
      event.preventDefault();
  
      // Récupérer l'ID du cours à partir de l'élément parent <a>
      var courseId = $(this).parent('.course-link').attr('id');
  
      // Effectuer la requête AJAX vers votre endpoint back-end
      $.ajax({
        url: '/api/clients',
        type: 'POST',
        data: {
          courseId: courseId
        },
        success: function(response) {
          // Le cours a été ajouté avec succès au fichier JSON de l'utilisateur
          console.log(response);
        },
        error: function(error) {
          // Une erreur s'est produite lors de l'ajout du cours
          console.error(error);
        }
      });
    });
  });
  