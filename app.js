var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var querystring = require('querystring');
var urldb = "mongodb://admin:adminbdeecn@ds115625.mlab.com:15625/heroku_cjzk1rpq";
var generatePassword = require('password-generator');
var app = express();
var api_key = 'a0f0dd114ed7fe9001457d72d50b1ab9-49a2671e-599e0823';
var DOMAIN = 'sandbox0efee7c8eea44aea97d6fb71c3bee77b.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'robin.troesch@eleves.ec-nantes.fr',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});

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
    res.render('index', { title: "BDE | Accueil"})
});
app.get('/SAT_inscriptions', (req, res) => {
    res.render('sat_inscriptions', { title: "BDE | Killer SAT"})
});
app.post('/SAT_inscriptions', (req, res)=>{
  MongoClient.connect(urldb, function(err, db) {
    if (err) throw err;
    var mdp = generatePassword(5,true);

    var agent = { "prenom": req.body.prenom, "nom": req.body.nom, "mail": req.body.email,"score":0,"alive":true,"team":1,"mdp":mdp,"code":code };
    db.collection("KillerSAT").insertOne(agent, function(err, res) {
      if (err) throw err;
      console.log("Agent ajoute dans db");
      db.close();
    });
    res.render('sat_inscriptions', { title: "BDE | Killer SAT", message: "Inscription confirmée !"})
  });

});
app.get('/partenaires', (req, res) => {
    partenaires = JSON.parse(fs.readFileSync('./public/data/partenaires.json', 'utf8'));
    res.render('partenaires', { title: "BDE | Partenaires", partenaires: partenaires })
});
app.get('/signature',(req,res)=>{
    res.render('signature',{ title: "BDE | Signature ECN"})
});


app.get('/mde', (req, res) => {
    MongoClient.connect(urldb, function(err, db) {
      if (err) throw err;
      db.collection("MDE").find({ "ok": true }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.render('mde', { title: "BDE | Réservation MDE", bookings: result})
      });
    });
});

app.get('/adminMDE', (req, res) => {
    MongoClient.connect(urldb, function(err, db) {
      if (err) throw err;
      db.collection("MDE").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.render('adminMDE', { title: "BDE | Admin MDE", bookings: result})
      });
    });
});
app.get('/carte',(req,res)=>{
    appart = JSON.stringify(fs.readFileSync('./public/data/appart.json', 'utf8'));
    var succes = req.query.succes;
    if (succes){
        res.render('appartathlon', { title: "BDE | Campagnes 2019",appart:appart,message:"Modifications enregistrées"})
    }
    else{
    res.render('appartathlon', { title: "BDE | Campagnes 2019",appart:appart})
    }
});

app.post('/adminMDE', (req, res) => {
    if (req.body.inputGestion && req.body.inputDate && req.body.inputPhone) {
        if (req.body.inputAction == "Supprimer") {
            MongoClient.connect(urldb, function(err, db) {
              if (err) throw err;
              var query = { "date": req.body.inputDate,
                            "phone": req.body.inputPhone
                        };
              db.collection("MDE").deleteOne(query, function(err, obj) {
                if (err) throw err;
              });
              db.collection("MDE").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                res.render('adminMDE', { title: "BDE | Admin MDE", bookings: result})
              });
            });
        } else if (req.body.inputAction == "Accepter")
        {
            MongoClient.connect(urldb, function(err, db) {
              if (err) throw err;
              var query = { "date": req.body.inputDate,
                            "phone": req.body.inputPhone
                        };
              var updated = { $set: { "ok": true } };
              db.collection("MDE").updateOne(query, updated, function(err, obj) {
                if (err) throw err;
              });
              db.collection("MDE").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                res.render('adminMDE', { title: "BDE | Admin MDE", bookings: result})
              });
            });
        }
    }
    else {
        db.collection("MDE").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render('adminMDE', { title: "BDE | Admin MDE", bookings: result})
        });
    }
});

app.post('/mde', (req, res) => {
    var bookings;
    MongoClient.connect(urldb, function(err, db) {
      if (err) throw err;
      db.collection("MDE").find({ "ok": true }).sort({date: -1}).toArray(function(err, result) {
        if (err) throw err;
        bookings = result;
        db.close();
      });
    });
    if (req.body.inputMDE && req.body.inputPhone && req.body.inputDate && req.body.inputClub && req.body.inputSalle) {
        MongoClient.connect(urldb, function(err, db) {
          if (err) throw err;
          var query = { date: req.body.inputDate };
          db.collection("MDE").find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length > 1) {
                res.render('mde', { title: "BDE | Réservation MDE", message: "Cette date n'est pas disponible"})
            }
            else {
                var salle = req.body.inputSalle == "Les deux" ? "Haute + Basse" : req.body.inputSalle
                var myobj = { "prenom": req.body.inputFName, "nom": req.body.inputName, "phone": req.body.inputPhone, "date": req.body.inputDate, "club": req.body.inputClub, "salle": salle, "ok": false };
                db.collection("MDE").insertOne(myobj, function(err, res) {
                  if (err) throw err;
                  console.log("Reservation saved in db");
                  db.close();
                });
                res.render('mde', { title: "BDE | Réservation MDE", message: "Demande de réservation bien envoyée ! En attente de confirmation par le BDE"})
            }
          });
        });
    }
    else {
        res.render('mde', { title: "BDE | Réservation MDE", message: "Erreur ! Avez-vous saisi les informations au format demandé?", bookings: bookings})
    }
});

app.get('/hautsfaits', (req, res) => {
    hautsfaits = JSON.parse(fs.readFileSync('./public/data/hautsfaits.json', 'utf8'));
    res.render('hautsfaits', { title: "BDE | Hauts Faits", hautsfaits: hautsfaits})
});

app.get('/admin', (req, res) => {
    if (req.session.isAdmin) {
        res.render('admin', { title: "BDE | Admin" })
    }
    else {
        res.render('login', { title: "BDE | Admin" })
    }
});
/*app.get('/updateAppartMo', (req, res) => {
    res.render('index', { title: "BDE | Accueil"})
});*/
app.post('/updateAppartMo', (req, res) => {
    statut = req.body.statut;
    colloc = req.body.colloc;
    horaires = req.body.horaires;
    appart = JSON.parse(fs.readFileSync('./public/data/appart.json', 'utf8'));
    for (i=0;i<appart.length;i++){
        if (colloc == appart[i]["Colloc"]){
            appart[i]["Statut"] = statut;
            appart[i]["Horaires"] = horaires;
            fs.writeFileSync('./public/data/appart.json', JSON.stringify(appart, null, 4));
        }
    }
   res.redirect('/appartathlon?succes=true');
});
app.get('/updateAppart', (req, res) => {
    if (req.session.isloggedin) {
        appart = JSON.parse(fs.readFileSync('./public/data/appart.json', 'utf8'));
        for (i=0;i<appart.length;i++){
            if (req.session.colloc == appart[i]["Colloc"]){
                infos = JSON.stringify(appart[i]);
            }

        }
        res.render('updateAppart', { title: "BDE | Mise à jour de l'appart",Colloc: req.session.colloc,infos:infos})
    }
    else {
        apparts = JSON.stringify(fs.readFileSync('./public/data/loginAppart.json', 'utf8'));
        res.render('authentification', { title: "BDE | Authentification Appartathlon",appart:apparts })
    }
});
app.post('/updateAppart', (req, res) => {
    login = JSON.parse(fs.readFileSync('./public/data/loginAppart.json', 'utf8'));
    success = false;
    for (i=0;i<login.length;i++){
        if (req.body.inputLogin == login[i]["Colloc"] && req.body.inputPassword == login[i]["mdp"]) {
            req.session.isloggedin = true;
            req.session.colloc = login[i]["Colloc"];
            appart = JSON.parse(fs.readFileSync('./public/data/appart.json', 'utf8'));
            for (j=0;j<appart.length;j++){
                if (req.session.colloc == appart[j]["Colloc"]){
                    infos = JSON.stringify(appart[j]);
                }
            }
            res.render('updateAppart', { title: "BDE | Mise à, jour de l'appart", message: "Authentification effectuée avec succès!",Colloc : req.session.colloc,infos:infos});
            success = true;
           }
    }
    if(!success){
        apparts = JSON.stringify(fs.readFileSync('./public/data/loginAppart.json', 'utf8'));
        res.render('authentification', { title: "BDE | Authentification", message: "Mot de passe incorret !",appart:apparts })
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
