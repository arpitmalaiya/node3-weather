const express = require('express')
const path = require('path')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecastcode = require('./utils/forecastcode')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

app.use(express.static(publicDirectoryPath))

app.get('', (req , res)=>{

    res.render('index',{
        title:'Weather App',
        name:'Arpit malaiya'
    })

})

app.get('/about', (req , res)=>{

    res.render('about',{
        title: 'About page',
        name:'Arpit malaiya'
    })

})
app.get('/help', (req , res)=>{

    res.render('help',{
        name:'Arpit malaiya',
        title:'Help'
    })

})

app.get('/weather', (req , res)=>{

    if(!req.query.address){
        return res.send({
            error:'you must provide an address.'
        })
    }
    
    geocode(req.query.address, (error, {latitude,longitude,location}= {} ) =>{
        if(error){
            return res.send({error})
        }
      
        forecastcode(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            
           
            console.log(location)
            console.log(forecastData)
            res.send({
                address:req.query.address,
                location: location,
                forecast : forecastData  
            })
            
        })
        
    })

   

})
app.get('/help/*', (req , res)=>{

    res.render('404',{
        name:'Arpit malaiya',
        title:'Help page not found'
    })

})
app.get('/*', (req , res)=>{

    res.render('404',{
        name:'Arpit malaiya',
        title:'Page not found'
    })

})
app.listen(port,()=>{

    console.log('server up on'+ port)
})

