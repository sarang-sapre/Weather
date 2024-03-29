const path = require('path')
const express = require('express')
const hbs = require('hbs')
var geocode = require('./utils/geocode')
var forecast = require('./utils/forecast')

const app = express()
var port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sarang Sapre'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sarang Sapre'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sarang Sapre'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
    res.send({
        error: 'Address is required'
        
    })
    }else{
        var input = req.query.address
        geocode(input, (error, {latitude,location,longitude}=([])) => {
            if (error){
                res.send({
                    error: 'incorrect address'
                })
            }else{
            
            forecast(latitude,longitude, (error, {summary,temperature,pressure}=([])) => {
            if(error){
                res.send({
                    error:'incorrect lat & long'
                })
            }else{
               // console.log('location : '+location+'\n'+'Summary : '+summary+'\n'+'Temperature : '+temperature+'\n'+'Pressure : '+pressure)
                res.send({
                    location:location,
                    summary:summary,
                    temperature:temperature,
                    pressure:pressure
                })



            }
              })
            }
            })
            
            }
        
        })

    


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarang Sapre',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarang Sapre',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})