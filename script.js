//WMO ASCII art
const wmoASCII = new Map();
wmoASCII.set(0,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp&nbsp.-."      +"<br>"+
            "&nbsp― ( &nbsp ) ―"           +"<br>"+
            "&nbsp&nbsp&nbsp&nbsp`-’"      +"<br>"+
            "&nbsp&nbsp&nbsp/  &nbsp \\"
    }
)

/*

   \   /
    .-.
 ― (   ) ―
    `-’
   /   \

*/
wmoASCII.set(1,
    {
        class: 'partlyCloudy',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp/"          +"<br>"+
            '&nbsp_/"".-.'                 +"<br>"+
            "&nbsp&nbsp\\_( &nbsp )."      +"<br>"+
            "&nbsp&nbsp/(___(__)"
    }
)

/*

  \  /
_ /"".-.
  \_(   ).
  /(___(__)

*/

wmoASCII.set(3,
    {
        class: 'cloudy',
        innerHTML:
            "&nbsp&nbsp&nbsp&nbsp.--."     +"<br>"+
            "&nbsp.-( &nbsp&nbsp )."       +"<br>"+
            "(___.__)__)"
    }
)
/*

      .--.
   .-(    ).
  (___.__)__)

*/
wmoASCII.set(45,
    {
        class: 'foggy',
        innerHTML:
            "_ - _ - _ -"        +"<br>"+
            "&nbsp_ - _ - _"           +"<br>"+
            "_ - _ - _ -"
    }
)

/*

_ - _ - _ -
 _ - _ - _
_ - _ - _ -

*/

wmoASCII.set(61,
    {
        class: 'light_rain',
        innerHTML:
            "&nbsp&nbsp&nbsp.-."      +"<br>"+
            "&nbsp&nbsp( &nbsp  )."   +"<br>"+
            "&nbsp(___(__)"           +"<br>"+
            "&nbsp&nbsp´ ´ ´"         +"<br>"+
            "&nbsp´ ´ ´"
    }
)

/*

    .-.
   (   ).
  (___(__)
   ´ ´ ´
  ´ ´ ´

*/

wmoASCII.set(63,
    {
        class: 'moderate_rain',
        innerHTML:
            "&nbsp&nbsp&nbsp&nbsp.-."      +"<br>"+
            "&nbsp&nbsp&nbsp( &nbsp  )."   +"<br>"+
            "&nbsp&nbsp(___(__)"           +"<br>"+
            "&nbsp&nbsp&nbsp‘ ‘ ‘"         +"<br>"+
            "&nbsp&nbsp‘ ‘ ‘"
    }
)

/*

    .-.
   (   ).
  (___(__)
   ‘ ‘ ‘
  ‘ ‘ ‘

*/

wmoASCII.set(65,
    {
        class: 'heavy_rain',
        innerHTML:
            "&nbsp&nbsp&nbsp&nbsp.-."      +"<br>"+
            "&nbsp&nbsp&nbsp( &nbsp  )."   +"<br>"+
            "&nbsp&nbsp(___(__)"           +"<br>"+
            "&nbsp&nbsp&nbsp/////"         +"<br>"+
            "&nbsp&nbsp/////"
    }
)

/*

    .-.
   (   ).
  (___(__)
   /////
  /////

*/

wmoASCII.set(71,
    {
        class: 'slight_snow',
        innerHTML:
            "&nbsp&nbsp&nbsp&nbsp.-."+"<br>"+
            "&nbsp&nbsp&nbsp( &nbsp )."     +"<br>"+
            "&nbsp&nbsp(___(__)"  +"<br>"+
            "&nbsp&nbsp&nbsp. . . ."     +"<br>"+
            "&nbsp&nbsp. . . ."
    }
)

/*

    .-.
   (   ).
  (___(__)
  . . . .
 . . . .

*/

wmoASCII.set(75,
    {
        class: 'heavy_snow',
        innerHTML:
            "&nbsp&nbsp&nbsp&nbsp.-."+"<br>"+
            "&nbsp&nbsp&nbsp( &nbsp )."     +"<br>"+
            "&nbsp&nbsp(___(__)"  +"<br>"+
            "&nbsp&nbsp&nbsp* * * *"     +"<br>"+
            "&nbsp&nbsp* * * *"
    }
)

/*

    .-.
   (   ).
  (___(__)
  * * * *
 * * * *

*/

wmoASCII.set(95,
    {
        class: 'thunderstorm',
        innerHTML:
            "&nbsp&nbsp&nbsp&nbsp.-."   +"<br>"+
            "&nbsp&nbsp&nbsp( &nbsp )"     +"<br>"+
            "&nbsp&nbsp(___(__)"  +"<br>"+
            "&nbsp&nbsp /_;/_;/_"     +"<br>"+
            "&nbsp&nbsp&nbsp  /; /; /"
    }
)

/*
    .-.
   (   )
  (___(__)
   /_;/_;/_
    /; /; /

*/

const wmoTrans = new Map();
wmoTrans.set(0, "Clear sky");
wmoTrans.set(1, "Mainly clear");
wmoTrans.set(2, "Partly cloudy");
wmoTrans.set(45, "Fog");
wmoTrans.set(48, "Rime fog");
wmoTrans.set(51, "Light drizzle");
wmoTrans.set(53, "Moderate drizzle");
wmoTrans.set(55, "Dense drizzle");
wmoTrans.set(56, "Light freezing drizzle");
wmoTrans.set(57, "Dense freezing drizzle");
wmoTrans.set(61, "Light rain");
wmoTrans.set(63, "Moderate rain");
wmoTrans.set(65, "Heavy rain");
wmoTrans.set(66, "Light freezing rain");
wmoTrans.set(67, "Heavy freezing rain");
wmoTrans.set(71, "Light snow");
wmoTrans.set(73, "Moderate snow");
wmoTrans.set(75, "Heavy snow");
wmoTrans.set(77, "Snow grains");
wmoTrans.set(80, "Light rain showers");
wmoTrans.set(81, "Moderate rain showers");
wmoTrans.set(82, "Heavy rain showers");
wmoTrans.set(85, "Light snow showers");
wmoTrans.set(86, "Heavy snow showers");
wmoTrans.set(95, "Thunderstorm");
wmoTrans.set(96, "Thunderstorm with light hail");
wmoTrans.set(99, "Thunderstorm with heavy hail");


var geoRequest = new XMLHttpRequest();
geoRequest.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(this.responseText);
        //Check for error
		if(response.status !== 'success') {
			console.log('geo query failed: ' + response.message);
			return;
		}
		//Assign JSON coordinates to variables
        var lat = response.lat;
		var lon = response.lon;
        var country = response.country;
        var region = response.regionName;
        var city = response.city;

        var weatherRequest = new XMLHttpRequest();
        weatherRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                //Check for error
                if(response === null) {
                    console.log("weather query failed");
                    return;
                } else {
                    console.log(response);
                    const body = document.getElementById("body");

                    //Header
                    const header = document.getElementById("header");
                    header.innerHTML += `Weather in ${city}, ${region}, ${country}:`;

                    //Cloning weather information from response
                    var forecastList = structuredClone(response.daily);

                    //Normalising weather codes to fit with available art
                    forecastList.normWMO = [];
                    for (let i = 0; i < forecastList.weathercode.length; i++) {
                        forecastList.normWMO[i] = normaliseWMO(forecastList.weathercode[i]);                     
                    }
                    console.log(forecastList);

                    //Normalising wind direction to fit with available arrow directions (45° instances)
                    forecastList.normWindDir = [];
                    for (let i = 0; i < forecastList.winddirection_10m_dominant.length; i++) {
                        forecastList.normWindDir[i] = normaliseWindDirection(forecastList.winddirection_10m_dominant[i]);
                    }

                    for (let i = 0; i < forecastList.time.length; i++) {
                        forecastList.time[i] = new Date(forecastList.time[i]);
                    }


                    //Making weather cards

                    for (let i = 0; i < forecastList.weathercode.length; i++) {
                        let weekday = forecastList.time[i].toLocaleDateString(undefined, { weekday: "long" });
                        document.getElementById("forecast_container").innerHTML+=`
                            <div class="weather_card">
                                <p class="${wmoASCII.get(forecastList.normWMO[i]).class} weather_icon">${wmoASCII.get(forecastList.normWMO[i]).innerHTML}</p>
                                <p class="weather_info">
                                    ${weekday.slice(0,1).toUpperCase() + weekday.slice(1)} <br>
                                    ${forecastList.time[i].toLocaleDateString()} <br>
                                    ${wmoTrans.get(forecastList.weathercode[i])} <br>
                                    ${forecastList.temperature_2m_max[i]} (${forecastList.apparent_temperature_max[i]}) <br>
                                    ${forecastList.temperature_2m_min[i]} (${forecastList.apparent_temperature_min[i]}) <br>
                                    ${forecastList.precipitation_probability_mean[i]}% <br>
                                    ${forecastList.precipitation_sum[i]} mm <br>
                                    ${forecastList.normWindDir[i]} ${forecastList.windspeed_10m_max[i]} km/h
                                </p>
                            </div>
                        `
                    }

                }
            }
        }
        let endpoint = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&timezone=auto&forecast_days=10&daily=temperature_2m_max,temperature_2m_min,weathercode,apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean,precipitation_sum,winddirection_10m_dominant,windspeed_10m_max";
        weatherRequest.open("GET", endpoint, true);
        weatherRequest.send();
	}
};

geoRequest.open('GET', "http://ip-api.com/json/?fields=status,lat,lon,city,regionName,country", true);
geoRequest.send();

function normaliseWMO(wmo) {
    if (wmo === 2) {
        return 1;
    } else if (wmo === 48) {
        return 45;
    } else if (wmo === 51 || wmo === 53 || wmo === 55 || wmo === 56 || wmo === 57 || wmo === 66 || wmo === 80) {
        return 61;
    } else if (wmo === 81) {
        return 63;
    } else if (wmo === 67 || wmo === 82) {
        return 65;
    } else if (wmo === 73 || wmo === 86) {
        return 75
    } else if (wmo === 77 || wmo === 85) {
        return 71;
    } else if (wmo === 96 || wmo === 99) {
        return 95;
    } else return wmo;
}

function normaliseWindDirection(degree) {
    degree = Math.round(degree/45);
    if (degree === 0 || degree === 8) {
        return "↑";
    } else if (degree === 1) {
        return "↗";
    } else if (degree === 2) {
        return "→";
    } else if (degree === 3) {
        return "↘";   
    } else if (degree === 4) {
        return "↓";   
    } else if (degree === 5) {
        return "↙";   
    } else if (degree === 6) {
        return "←";   
    } else if (degree === 7) {
        return "↖";   
    }
}

function normaliseTime(time) {
    // 2023-08-04
    const date = new Date(time)
}