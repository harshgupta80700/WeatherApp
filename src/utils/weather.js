const request = require('request')

// const url = 'http://api.weatherapi.com/v1/current.json?key=9d0967b05e6048f6b7b122823202808&q=-154,-122'

// request({url: url,json: true},(error,response)=>{
    
//     if (error) {
//         console.log('Unable to connect to weather!')
//     }else if(response.body.error){
//         console.log(response.body.error.message)
//     }else {
//         console.log('The name '+ response.body.location.name+ ' and the country is '+ response.body.location.country)
//     }
// })

const getweatherinfo = (latitute, longitude, callback)=>{
    const url  = 'http://api.weatherapi.com/v1/current.json?key=9d0967b05e6048f6b7b122823202808&q='+ latitute + ',' + longitude

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect with the get weather service!',undefined)
        }else if(body.error){
            callback(body.error.message,undefined)
        }else{
            callback(undefined,{
                name: body.location.name,
                region: body.location.region,
                country: body.location.country,
                tempinf: body.current.temp_f,
                tempinc: body.current.temp_c
            })
        }
    })

}

module.exports = getweatherinfo
