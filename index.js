'use strict';

const express = require('express'),
  app     = express(),
  PouchDB = require('pouchdb'),
  bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  const {authorization} = req.headers;
  const profile = req.headers['x-acting-profile'];
  if (!authorization || !profile) {
    return res.status(401).end(); 
  }
  next();
});

app.use('/db', require('express-pouchdb')(PouchDB));

app.use('*', (err, req, res) => {
  console.log(err);
  res.json({err: 'not fount'});
});

app.listen(process.env.PORT|| 3000);

