// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

// Start up an instance of app

let app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server Running at Port ${port}`);
});

app.get('/all', (request,response) => {
    response.send(projectData);
});

app.post('/add', (request,response) => {
    newData = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    }

    projectData.unshift(newData);
});