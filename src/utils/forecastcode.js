const request= require('request')

const forecastcode =(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/094c7966ea6f4c1de807cd7647ad2a4f/' + latitude + ','+ longitude +'?units=si'
    request({ url, json: true }, (error, {body}) => {
    
            if(error){
                callback( 'Unable to connect to the weather service',undefined )
            }
            else if(body.error){
                callback( 'Unable to find location',undefined )
            }
            else{
                callback(undefined,body.daily.data[0].summary+ ' It is currently '+
                     (body.currently.temperature) + ' degrees out. There is a '+
                      (body.currently.precipProbability)+ ' % chance of rain.')
            }
        })

}
module.exports =forecastcode
