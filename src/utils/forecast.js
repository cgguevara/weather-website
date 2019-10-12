const request = require('request')


const forecast = (longitud, latitud, callback) => {
    const url = 'https://api.darksky.net/forecast/6f053e380cbf8755bd7a25e9ba7b451c/'+latitud+','+longitud+'?units=si&lang=es'
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(body.error){
            callback('Unable to find location: ' + response.body.error,undefined)
        }else{
            callback(undefined,body.currently.summary + '. Temperatura de ' + body.currently.temperature + '°C. Hay un ' + body.currently.precipProbability + '% de probabilidad de lluvia')
            /*callback(undefined,{
                hora: response.body.hourly.data[0].time,
                summary: response.body.currently.summary,
                temperature: response.body.hourly.data[0].temperature,
                chance_rain: response.body.currently.precipProbability

            })*/
        }
    })

}

module.exports = forecast