const request = require('request')



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=f4af8aa7fcb4dc099058a4e5991d623d&units=metric';
    
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to network', undefined);
        }else if(body.cod === 404 || body.cod === 401){
            callback(body.message, undefined)
        }else{  
            callback(undefined, 'It is '+body.main.temp+' degrees out there but it feels like '+ body.main.feels_like+' degrees')
        }
        
    })
    
}

module.exports = forecast