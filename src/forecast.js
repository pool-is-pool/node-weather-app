const request = require("request")

const forecast = function (latitude, longitude, callback) {
    const url = "http://api.weatherstack.com/current?access_key=f51c22f62cc1947af2854eb3a5b972c8&query=" + latitude +","+ longitude +"&units=m"

    request({url: url,json: true},(error,response) => {
        if (error) { 
            callback("Unable to connect to weather service!",undefined)
            
    
        } else if (response.body.error) {
            callback("Unable to find location",undefined)
            
    
        }else {
            let current = response.body.current
            //console.log(current,url)
            callback(undefined, current.weather_descriptions[0] + ". The temperature is " + current.temperature + " degrees out. It feels like " + current.feelslike + " degrees out.")
        }
    })
}


module.exports = forecast
 