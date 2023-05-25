if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const file =  "./data/users.json";
  const fs = require('fs');
  const business = require('../business/business');
  const express = require('express')
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')

// Create a new Express application
const app = express();

// Import and use the CORS middleware to enable cross-origin requests
var cors = require('cors')
app.use(cors()); 

const initializePassport = require('./passport-config')


 

// Define an object to hold all of the API server's functionality
const apiServ = {
    
    // Method to start the server and listen on a given port
    start : function(port) {

         users = business.getAllClients();

        initializePassport(
            passport,
            email => users.find(user => user.email === email),
            id => users.find(user => user.id === id)
          )
    
          
          
          app.set('view-engine', 'ejs')
          app.use(express.urlencoded({ extended: false }))
          app.use(flash())
          app.use(session({
            secret: 'ThisIsASecretKey123!',
            resave: false,
            saveUninitialized: false
          }))
          app.use(passport.initialize())
          app.use(passport.session())
          app.use(methodOverride('_method'))
          
          app.get('/', checkAuthenticated, (req, res) => {
            res.render('../../client/views/index.ejs', { name: req.user.name })
          })
          
          app.get('/login', checkNotAuthenticated, (req, res) => {
            res.render('../../client/views/login.ejs')
          })
          
          app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
          }))
          
          app.get('/register', checkNotAuthenticated, (req, res) => {
            res.render('../../client/views/register.ejs')
          })
          
          app.post('/register', checkNotAuthenticated, async (req, res) => {
            try {
              const hashedPassword = await bcrypt.hash(req.body.password, 10);
          
              // Read existing users (if file exists)
              
              
          
              const newUser = {
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
              };
          
                business.addUser(newUser);

              // Save users to the users.json file
              fs.writeFileSync(file, JSON.stringify(users, null, 2));
          
              res.redirect('/login');
            } catch {
              res.redirect('/register');
            }
          });
          
          
          app.delete('/logout', (req, res) => {
            req.logout(function(err) {
              if (err) {
                // Gérer l'erreur ici
                return next(err);
              }
              // Rediriger l'utilisateur vers une page appropriée après la déconnexion
              res.redirect('/login');
            });
          });
          
          function checkAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
              return next()
            }
          
            res.redirect('/login')
          }
          
          function checkNotAuthenticated(req, res, next) {
            if (req.isAuthenticated()) {
              return res.redirect('/')
            }
            next()
          }
        
        // Start listening on the specified port
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        }) 
    }
};


// Export the API server object for use in other modules
module.exports = apiServ;
