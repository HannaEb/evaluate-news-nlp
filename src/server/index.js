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
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialise the main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//Set up server
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Declare variables
let projectData = {}
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
let apiKey = process.env.API_KEY
const lang = 'en'

// POST request
const postData = (req, res) => {
  const text = req.body.txt
  const apiUrl = baseURL+'key='+apiKey+'&txt='+text+'&lang='+lang;

  fetchData(apiUrl)
  .then(data => {
    projectData = {
      agreement: data.agreement,
      confidence: data.confidence,
      irony: data.irony,
      subjectivity: data.subjectivity,
      text: text
    }
  })
  .then(() => {
    res.send(projectData)
  })
}

const fetchData = async (url) => {
  const res = await fetch(url, {
    method: 'POST',
    redirect: 'follow'
  })
  try {
    const newData = await res.json()
    return newData
  } catch(error) {
    console.log('error', error)
  }
}

// POST route
app.post('/postData', postData)
