//Global Variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2eb7f9289b3e6ee8b9d43ec77776e0fa';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Reference Of Generate Button

let generateButton = document.getElementById('generate');

generateButton.addEventListener('click',magicFunction);

//Function to do the work 

function magicFunction(event) {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getWeatherData(baseURL+zipCode+apiKey);
}


const getWeatherData = async (url='') => {
    //Variables Required
    let dataStore = {};
    let feelings = document.getElementById('feelings').value;
    //Fetching Data From Open Weather Map API
    await fetch(url)
    .then((res) => res.json())
    .then((data) => {
        dataStore = {
            temp: data.main.temp,
            date: newDate,
            userResponse: feelings
        }
        console.log(dataStore);
    });

    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataStore)
    }

    updateUI('/',dataStore);

    //Post Request
    const postResponse = await fetch('/',options);
    
}

const updateUI = (url = '',dataStore) => {

    let date = document.getElementById('date');
    let temp = document.getElementById('temp');
    let content = document.getElementById('content');

    date.innerHTML = dataStore.date;
    temp.innerHTML = dataStore.temp;
    content.innerHTML = dataStore.userResponse; 
}





