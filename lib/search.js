var querystring = require('querystring');
var single_location_entry = require('../data/single_location_entry');

module.exports = function(parameters){
  locals            = this.locals;

  //Logger
  locals.log("Search", locals.inspect(parameters));

  parameters.client = this.CLIENT_ID; //Send CLIENT_ID

  //Build search endpoint
  var endpoint = this.API_endpoint + '/locations/search?' + querystring.stringify(parameters);

  var tr = locals.through(function(buff){

    locals.log('API responce: ', locals.inspect(buff.toString()));

    //Send costum information
    locals.log('Send example location to searchResults.txt: ', locals.inspect(single_location_entry));
    this.queue(JSON.stringify(single_location_entry));
  });

  //Send search result to searchResult.txt
  locals.request(endpoint).pipe(tr).pipe(locals.fs.createWriteStream('searchResults.txt'));
};
