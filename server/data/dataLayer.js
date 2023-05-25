const file = __dirname + "/" + "users.json";
const fs = require('fs');

let data = {
    //return all clients from users.json
    getAllClients : function(){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse the JSON caracter to JavaScript object
        let clients = JSON.parse(rawdata);
        //return object
        return clients;
    },

    // Returns only the number of clients for the specified page
    getClients : function(number, page){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse the JSON caracter to JavaScript object
        let clients = JSON.parse(rawdata);

        const total = clients.length;

        
        if (number && page) { // Check if both number and page are defined
            clients = clients.slice((page - 1) * number, page * number); // Select a portion of the array to display
          }
          
          clients = { // Create a new object with two properties
            total: total, // Set the total property to the total number of clients
            clients: clients // Set the clients property to the selected portion of the array (or the entire array if number and page are undefined)
          };

        //return object
        return clients;
    },

    addUser : function(user){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let clients = JSON.parse(rawdata);
        //add the new client to the clients array
        clients.push(user);
        //parse to Json caracter
        var newdata = JSON.stringify(clients);
        //add the new client to the json file 
        //it will throw an error if the informations of the new client are not conform
        fs.writeFile(file, newdata, err => {
            if (err) throw err;
        });

    },

    updateUser : function(user){
        
        const data = fs.readFileSync(file);
        const clients = JSON.parse(data);

        // Find the object to update
        const object_id = clients.findIndex(obj => obj.id === user.id);

        // If the object exists, update its properties with the provided data (user)
        if (object_id !== -1) {
            // Create a new object with updated properties
            const updatedObject = { ...clients[object_id], ...user };
             // Replace the old object with the updated object
            clients[object_id] = updatedObject;
            // Écrit le nouveau contenu du fichier JSON
            const updatedData = JSON.stringify(clients, null, 2);
            fs.writeFileSync(file, updatedData);
            return 1;
        } else {
            return 0;
        }
    },

    // This function removes a user from the list based on their ID
    removeUser: function(removeuser_id) {
        // Read data from the JSON file
        const rawdata = fs.readFileSync(file);
        // Parse the data to a JavaScript object
        let newclients = JSON.parse(rawdata);
        // Find the index of the user to remove
        const id = newclients.findIndex(user => user.id === parseInt(removeuser_id));
        if (id != -1) {
            // If the user exists, remove it from the array
            newclients.splice(id, 1);
            // Reorganize the IDs of the remaining users to avoid gaps in the sequence  
            for (let i = id ; i < newclients.length; i++) {
                newclients[i].id--;
              }
             // Write the updated data back to the file
            fs.writeFileSync(file, JSON.stringify(newclients, null, 2));
            return 1;
        } else {
            // If the user doesn't exist, return 0
            return 0;
        }
    }
}

module.exports = data;