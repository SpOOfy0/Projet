const express = require('express');


// Create a new Express application
const app = express();

// Import and use the CORS middleware to enable cross-origin requests
var cors = require('cors')
app.use(cors()); 

// Define an object to hold all of the API server's functionality
const apiServ = {
    
    // Method to start the server and listen on a given port
    start : function(port) {

        // Use the JSON body parser middleware to parse request bodies as JSON
        app.use(express.json()); 
        
        // Define a route to retrieve all clients and return them as a JSON response
        app.get('/api/clients/all', (req,res) => {   
            const clients = business.getAllClients();
            res.status(200).json(clients);
        })

        // Start listening on the specified port
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        }) 
    }
};


// Export the API server object for use in other modules
module.exports = apiServ;
