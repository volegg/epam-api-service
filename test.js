var request = require('request');
var countries = require('./server/constants/countries');


request('https://randomuser.me/api/?results=1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body) // Show the HTML for the Google homepage.
    const json = JSON.parse(body);
    // console.log(json.results[0]);
    const j = json.results.map((user) => {
      return {
        name: user.name.first,
        surname: user.name.last,
        country: countries[Math.floor(Math.random() * (249 - 1) + 1)]
      };
    });
    console.log(j)
  }
})