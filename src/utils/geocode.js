const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2d1ZXZhcmFhIiwiYSI6ImNqejY0MXl4dDA1NjgzaGx3aGhvM2NtdDQifQ.gsTrEyEcOVvL6HQK3PXG6Q'
        request({url, json: true}, (error, {body}) => {
            if(error){
                callback("Unable to connect to location services", undefined)
            }else if(body.features.length == 0){
                callback("Unable to find location. Try another search", undefined)
            }else{
                callback(undefined, {
                    longitud: body.features[0].center[0],
                    latitud:  body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }
        })    
}


module.exports = geocode