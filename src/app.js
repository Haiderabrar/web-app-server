const path = require('path')
const express = require('express')
const geocode = require('./utils/geolocation')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)
app.use(express.static(publicDirectoryPath))



app.get('', function (req, res) {
    res.render('index',{
        title:"Weather App",
        name: "Waleed Mazhar"
    })
})

app.get('/help', function (req, res) {
    res.render('help', {
        title:"Help",
        name: "Waleed Mazhar",
        helpText: 'This is some helpfult text'
    })
})

app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Waleed Mazhar'
    })
})

// app.get('/products', function (req, res) {
    
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
    
    
//     res.send({
//         products: []
//     })
//     console.log(req.query)
// });

app.get('/weather', function (req, res) {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        
            if(error){
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                
                if(error){
                    return res.send({error})
                }
                res.send({
                    
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                
        
            })
        })
    }
    
})

app.get('/help/*', function (req, res) {
    res.render('404', {
        title: 'Error 404',
        name: 'Waleed Mazhar',
        errorMessage: 'Help article could not be found'
    })
})

app.get('*', function (req, res) {
    res.render('404', {
        title: 'Error 404',
        name: 'Waleed Mazhar',
        errorMessage: 'Article could not be found'
    })
})



app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})