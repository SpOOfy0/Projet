const data = require('../data/dataLayer');

// Default values for pagination
const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 50;

// Business object with methods for managing clients
const business = {
    // Method to get all clients
    getAllClients : function(){
        return data.getAllClients();
    },

    // Method to get clients with pagination
    getClients : function(number, page){
        // Initialize page and number if not provided
        if(page == undefined ){
            page = defaultPage;
        }
        if(number == undefined ){
            number = defaultNumber;
        }
        // Set maximum number of clients to retrieve
        if(number > maxNumber)
            number = maxNumber;

        // Retrieve clients object from data layer
        const clients = data.getClients(number, page);

        // Add additional information to clients object
        clients.page = page;
        clients.number = number;
        clients.totalPages = Math.ceil(clients.total / number); 

        return clients;
    },

    // Method to add a user
    addUser : function(user){
        data.addUser(user);
        return { success: true, message: "User added successfully." };
    },

    // Method to update a user
    updateUser : function(user){
        let numberOfUsersUpdated = data.updateUser(user);
        if(numberOfUsersUpdated) return { success: true, message: "User updated successfully." };
        else return { success: false, message: "Error updating client." };
    },

    // Method to remove a user
    removeUser : function(user){
        let numberOfUsersRemoved = data.removeUser(user);
        if(numberOfUsersRemoved) return { success: true, message: "User removed successfully." };
        else return { success: false, message: "User ID not found." };
    }

};

// Export business object
module.exports = business;
