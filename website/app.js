/* Global Variables */
const apiKey = '&appid=2eb7f9289b3e6ee8b9d43ec77776e0fa';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Get Data Client Side
const getData =async (url = '') => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
};

//Post Data 
const postData = async (url = '',data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
};

const updateUI = async () => {
    const projectData = await getData('/');
    document.getElementById('date').innerHTML = newDate;
    document.getElementById('temp').innerHTML = `${projectData.temperature} &#8457`;
    document.getElementById('content').innerHTML = projectData.feelings;
};

const generateData = async () => {
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    const response = await fetch(`${baseURL}${zip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateUI();
    } catch (error) {
        console.error("error", error);
    }
};

document.getElementById('generate').addEventListener('click', generateData);