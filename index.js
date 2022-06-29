const express = require('express');            //Import statement.
const Datastore = require('nedb');                                   
const app = express();     /*i am gonna create a web application and call it app and the way i am gonna do that is just call the express function 
                           so that whole library the whole node package express basically comes in as a big 
                           function, so that i can execute and put  in a variable */
app.listen(3000, () => console.log('listening at 3000')); //we use callback function. it's just a callback function that happens once the server is listening.
app.use(express.json({ limit: '1mb' }));

//const database = []; //global variable
const database = new Datastore('database.db'); //path to a filename. Ultimately the data is going tosit in this file. 
database.loadDatabase(); //loads the file, load the exisisting data from the previous time the server ran. 
/*database.insert({name: "Kaushik", status: '🗃'});
database.insert({name: "Anika", status: '🎇'}); */

app.use(express.static('public'));  
app.get('/api', (request, response) => {
   database.find({}, (err, data) => {
       if (err) {
           response.end();
           return;
       }
    response.json(data);
  });
});
app.post('/api', (request, response) => {
    //console.log('I got a request.')
   // console.log(request.body); //the next step is to have my client send something to this particular endpoint with a post. And that is done with the fetch function in index.html(client-side).
   const data = request.body;
   const timestamp = Date.now();
   data.timestamp = timestamp;
   database.insert(data); //we are inserting it into the nedb datastore or database.or database.push(data);  
   response.json(data);
}); 