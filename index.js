var request = require('request');
var fs      = require('fs');
var through = require('through');
var inspect = require('eyes').inspector({stream:null});
var log     = console.log.bind(console);

//SinglePlatformJS
var SPJS = {

  CLIENT_ID: null,
  API_endpoint: 'http://api.singleplatform.co',
  set: function(name){ this[name] = require('./lib/'+name); },

  locals: {
    request: request,
    fs: fs,
    through: through,
    inspect: inspect,
    log: log
  }

};

//Public methods
SPJS.set('config'); //Set up CLIENT_ID
SPJS.set('search'); //Make a search

module.exports = SPJS;
