var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '781227' }))


app.get('/', (req, res) => {
    familles = JSON.parse(fs.readFileSync('./public/data/familles.json', 'utf8'));
    res.render('index', { title: "BDE | Accueil", familles: familles })
});

app.get('/partenaires', (req, res) => {
    partenaires = JSON.parse(fs.readFileSync('./public/data/partenaires.json', 'utf8'));
    res.render('partenaires', { title: "BDE | Partenaires", partenaires: partenaires })
});

app.get('/hautsfaits', (req, res) => {
    hautsfaits = JSON.parse(fs.readFileSync('./public/data/hautsfaits.json', 'utf8'));
    res.render('hautsfaits', { title: "BDE | Hauts Faits", hautsfaits: hautsfaits})
});

app.get('/killer/kill', (req, res) => {
    players = JSON.parse(fs.readFileSync('./private/killer.json', 'utf8'));
    res.render('kill', { title: "BDE | Kill", players: players })
});

app.post('/killer/kill', (req, res) => {
    players = JSON.parse(fs.readFileSync('./private/killer.json', 'utf8'));
    if (players[req.body.inputKillerId] && players[req.body.inputKillerId].cible === req.body.inputTargetId) {
      res.render('kill', { title: "BDE | Kill", players: players, message: "Votre kill a bien été validé! Bravo :)" })
    } else {
      res.render('kill', { title: "BDE | Kill", players: players, message: "Arnaqueur, tu ne vas pas nous la faire à l'envers ! :)" })
    }
    res.render('kill', { title: "BDE | Kill", players: players })
});

app.get('/killer/joueurs', (req, res) => {
    players = JSON.parse(fs.readFileSync('./private/killer.json', 'utf8'));
    res.render('joueurs', { title: "BDE | Joueurs", players: players })
});

app.get('/admin', (req, res) => {
    if (req.session.isAdmin) {
        res.render('admin', { title: "BDE | Admin" })
    }
    else {
        res.render('login', { title: "BDE | Admin" })
    }
});

app.post('/admin', (req, res) => {
    if (req.body.inputLogin && req.body.inputPassword == "adminbdeecn781227") {
        req.session.isAdmin = true;
        res.render('admin', { title: "BDE | Admin", message: "Authentification effectuée avec succès!" });
    }
    if (req.body.inputScore) {
        familles = JSON.parse(fs.readFileSync('./public/data/familles.json', 'utf8'));
        familles[req.body.inputFamille].score += Number(req.body.inputPoints);
        message = 'Les membres de la famille ' + req.body.inputFamille + ' viennent de gagner ' + Number(req.body.inputPoints) + ' point(s) !'
        fs.writeFileSync('./public/data/familles.json', JSON.stringify(familles, null, 4));
        res.render('admin', { title: "BDE | Admin", message: message})
    }
    if (req.body.inputHautsfaits) {
        familles = JSON.parse(fs.readFileSync('./public/data/familles.json', 'utf8'));
        hautsfaits = JSON.parse(fs.readFileSync('./public/data/hautsfaits.json', 'utf8'));
        hautsfaits[req.body.inputNumber].done = req.body.inputDone == "Oui" ? true : false;
        message = 'Haut fait actualisé !'
        fs.writeFileSync('./public/data/hautsfaits.json', JSON.stringify(hautsfaits, null, 4));
        res.render('admin', { title: "BDE | Admin", message: message})
    }
    if (req.body.inputPartenaire) {
        partenaires = JSON.parse(fs.readFileSync('./public/data/partenaires.json', 'utf8'));
        partenaires.push({
                "id": req.body.inputId,
                "description": req.body.inputDescription,
                "logo": req.body.inputLogo,
                "link": req.body.inputLink
            })
        message = 'Le nouveau partenaire ' + req.body.inputId + ' a bien été ajouté';
        fs.writeFileSync('./public/data/partenaires.json', JSON.stringify(partenaires, null, 4));
        res.render('admin', { title: "BDE | Admin", message: message})
    }
    else {
        res.render('login', { title: "BDE | Admin", message: "Mot de passe incorret !" })
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
