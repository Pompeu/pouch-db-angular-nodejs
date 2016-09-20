'use strict';

const express = require('express'),
  app     = express(),
  PouchDB = require('pouchdb');

app.use(express.static('public'));

app.use('/db', require('express-pouchdb')(PouchDB));

app.use('*', (req, res) => {
  res.json({err: 'not fount'});
});

app.listen(process.env.NODE_ENV || 3000);
