# Introduction

Welcome to the Customers Management Application! This web application is designed to help you manage your customers in an easy and efficient way. With this application, you can view, add, modify, and delete customer information all in one place.


# Getting started

 ## Installation

To install the project, you need to clone the repository from Github or Gitlab.


git clone https://github.com/SpOOfy0/Projet_MDL.git


## Usage

To start the Api server and the web server, you need to change the current working directory using cd .

 The API server will start listening on port 3001. You can access the application by visiting http://localhost:3001.
 The web server will start listening on port 3000. You can access the application by visiting http://localhost:3000.

# Functionnalities

## Displaying the Data (JSON)

To display the Data of customers, you can access the following URL: http://localhost:3001/api/clients/all . It will return a JSON array of all the customers.

## Displaying the list of customers

To display the list of customers, you can access the following URL: http://localhost:3000/list.html . It will return a HTML page of all the customers with pagination.


## Adding a new customer

To add a new customer, you can access the following URL: http://localhost:3000/add.html . You will need to submit a POST request with the following parameters:

    email (string, required): the email address of the customer
    first (string, required): the first name of the customer
    last (string, required): the last name of the customer
    company (string, required): the name of the company of the customer
    country (string, required): the country of the customer

The server will generate an id and a creation date automatically.


## Modifying a customer

To modify an existing customer, you can access the following URL: http://localhost:3000/update.html, where :id is the id of the customer you want to modify. You will need to submit a PUT request with the following parameters:

    email (string, required): the email address of the customer
    first (string, required): the first name of the customer
    last (string, required): the last name of the customer
    company (string, required): the name of the company of the customer
    country (string, required): the country of the customer


## Deleting a customer

To Delete an existing customer, you can access the following URL: http://localhost:3000/remove.html. You will need to submit a DELETE request with the following parameters:

    Id  (id, required): the Id of the customer
 

# Development

## Project structure

The project is structured as follows:

    server.js: the entry point of the application and the web servers (there are two files named server.js , one for the server on port 3001 and the auther on for the server on port 3000)
    usres.json: the JSON file containing the list of customers


## Coding style

 The project follows JavaScript style guide. ESLint is used to enforce this style guide. You can run ESLint by running the following command:

    npm run lint


 ## Test 
 
In addition to the main functionalities provided by the web application, you can also test some operations directly on the database without the need for a server.

Simply navigate to the "pres" folder and run the "consolePres.js" file. This will allow you to interact with the database through the console. This can be a useful tool for testing and debugging your application.


# Conclusion

This project provides powerful functionality to manage a list of customers. With a user-friendly interface and efficient data management, the Customers Management Application is an ideal solution for businesses of all sizes.
