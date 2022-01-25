// Set up dotenv
const dotenv = require('dotenv')
dotenv.config()

// Require dependencies
const fetch = require('node-fetch')
const path = require('path')
const express = require('express')

// Start up an instance of app
const app = express()

// Configure express to use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors({origin: 'http://localhost:8080'}));

// Initialise the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

//Set up server
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Declare variables
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
let apiKey = process.env.API_KEY;
const lang = 'en'

// POST route
app.post('/add', async (req, res) => {
    const text = req.query.ff;
    const data = await postData(baseURL, {key: apiKey , txt: text , lang: lang});
    res.send(data);
});

const postData = async (url ='', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await res.json();
        console.log(newData);
        return newData
    } catch(error) {
        console.log('error', error);
    }  
}

// const postData=async (url='',data={})=>{
//     const response=await fetch(url,{
//         method: 'POST', // The method
//         credentials:'same-origin',
//         headers:{
//             'Content-Type':'application/json',
//         },
//         body:JSON.stringify(data),
//     });
//     try{
//         const newData=await response.json();
  
//         console.log(newData);
  
//        return newData
//     } catch(error){
//         console.log("error",error);
//     }
  
//   }