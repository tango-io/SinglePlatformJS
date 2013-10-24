var querystring = require('querystring');

module.exports = function(parameters){
  locals            = this.locals;

  //Logger
  locals.log("Search", locals.inspect(parameters));

  parameters.client = this.CLIENT_ID; //Send CLIENT_ID

  //Build search endpoint
  var endpoint = this.API_endpoint + '/locations/search?' + querystring.stringify(parameters);

  var tr = locals.through(function(buff){
    locals.log(locals.inspect(buff.toString()));

    //Send costum information
    this.queue('hello world');
  });

  //Send search result to searchResult.txt
  locals.request(endpoint).pipe(tr).pipe(locals.fs.createWriteStream('searchResults.txt'));
};
