if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const file = 'users.json';
const fs = require('fs');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const rawdata = fs.readFileSync(file);
let users = JSON.parse(rawdata);

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
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Read existing users (if file exists)
    let users = [];
    if (fs.existsSync('users.json')) {
      const usersData = fs.readFileSync('users.json', 'utf8');
      users = JSON.parse(usersData);
    }

    const newUser = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };

    users.push(newUser);

    // Save users to the users.json file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

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

app.listen(3000)