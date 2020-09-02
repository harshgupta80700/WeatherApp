const path = require('path')
const express = require('express')
const hbs = require('hbs')

const getLandL = require('./utils/getLandL')
const getWeatherInfo = require('./utils/weather')
const getweatherinfo = require('./utils/weather')

// console.log(__dirname)
// console.log(path.join(__dirname,'..'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Harsh Gupta'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Harsh Gupta'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'This is the help page... Feel free to ask!',
        title: 'Help page',
        name: 'Harsh Gupta'
    })
})

// app.get('',(req , res)=>{    
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([
//         {
//             name: 'Harsh Gupta',
//             tech: 'Backend and Flutter developer',
//             age: 20
//         },
//         {
//             name: 'Harsh Gupta',
//             tech: 'Backend and Flutter developer',
//             age: 20
//         }
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send({
//         name: 'Harsh Gupta',
//         tech: 'Backend and Flutter developer',
//         age: 20
//     })
// })

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'An address is required'
        })
    }

    getLandL(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        getWeatherInfo(latitude,longitude,(error,{name,region,country,tempinf,tempinc}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                name: name,
                address: req.query.address,
                latitude: latitude,
                longitude: longitude,
                region: region,
                country:country,
                location: location,
                tempinF:tempinf,
                tempinC: tempinc
            })

        })
    })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
         return res.send({
            error: 'Search parameter is compulsory'
        })
    }
    console.log(req.query)    
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('errorpage',{
        title: 'Home Page not found',
        name: 'Harsh Gupta',
        errormessage: 'Home article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('errorpage',{
        title: '404 Page not found',
        name: 'Harsh Gupta',
        errormessage: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is on '+port)
})