var concat      = require('concat-stream');
var querystring = require('querystring');
var single_location_entry = require('../data/single_location_entry');

module.exports = function(parameters, cb){
  locals            = this.locals;

  //Logger
  locals.log("Search", locals.inspect(parameters));

  parameters.client = this.CLIENT_ID; //Send CLIENT_ID

  //Build search endpoint
  var endpoint = this.API_endpoint + '/locations/search?' + querystring.stringify(parameters);

  var parser = locals.through(function(buff){

    var result = buff.toString();
    locals.log('PARSE API responce: ', locals.inspect(result));

    //Change result for simple location result
    result = single_location_entry;

    this.queue(result);
  });

  locals.request(endpoint).pipe(parser).pipe(concat(cb));
};
