const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public/')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Cristhian Guevara'
    })
})

app.get('/places',(req, res) =>{
    res.render('places',{
        title: 'Search places',
        name: 'Cristhian Guevara'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Cristhian Guevara'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        name: 'Cristhian Guevara',
        title: 'Help page',
        message: 'This is a help page'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longitud = 0, latitud = 0, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(longitud, latitud, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }
            //console.log(location)
            //console.log(forecastData)
            res.send({
                forecastData: forecastData,
                location,
                address: req.query.address
            })
        })
        
    })

})




app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('error',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Cristhian Guevara'
    })
})

app.get('*', (req, res) =>{
    res.render('error',{
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Cristhian Guevara'
    })
    
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//app.com