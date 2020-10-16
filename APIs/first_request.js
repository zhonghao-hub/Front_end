var request = require("request");
var pry = require("pryjs");
request("https://jsonplaceholder.typicode.com/users/1", function(error, response, body){
    // eval(pry.it)
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        console.log("geo's address is:");
        console.log(parsedData.address.geo + "this is extra string!");
    }
});



