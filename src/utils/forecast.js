var request = require('request')


var forecast = (latitude,longitude,callback) => {

   // var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+latitude+','+longitude+'.json?access_token=pk.eyJ1Ijoic2FyYW5nNjkiLCJhIjoiY2sxb252Mm1vMGJkNTNnb2F4YXZ3d29uaSJ9.olaB4PvOyuPYvRWbpv6GKg'
    var url = 'https://api.darksky.net/forecast/8206770574477b1c0039675f0a3312f1/'+longitude+','+latitude
    
  //  console.log(url)
    request({url,json:true},(error,{body} = []) => {
     if(error){
         callback('Unable To connect Plz try again later',undefined)
     }  else if (body.code ===400) {
         callback('invalid lat and long',undefined)
     }else{
         callback(undefined,{
            summary : body.currently.summary,
            temperature : body.currently.temperature,
            pressure : body.currently.pressure
         })
     }
    }
    )
}

module.exports = forecast