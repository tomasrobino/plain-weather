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
            "&nbsp&nbsp&nbsp&nbsp.-."      +"<br>"+
            "&nbsp&nbsp&nbsp( &nbsp  )."   +"<br>"+
            "&nbsp&nbsp(___(__)"           +"<br>"+
            "&nbsp&nbsp&nbsp´ ´ ´"         +"<br>"+
            "&nbsp&nbsp´ ´ ´"
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
                    const header = document.createElement("p");
                    header.innerHTML += `Weather in ${city}, ${region}, ${country}:`;
                    body.appendChild(header);

                    var forecastList = structuredClone(response.daily);

                    for (let i = 0; i < forecastList.weathercode.length; i++) {
                        forecastList.weathercode[i] = normaliseWMO(forecastList.weathercode[i]);                     
                    }
                    console.log(forecastList);


                    //Today's weather

                    for (let i = 0; i < forecastList.weathercode.length; i++) {
                        document.body.innerHTML+=`
                            <div class="weather_card">
                            <p class="${wmoASCII.get(forecastList.weathercode[i]).class}">${wmoASCII.get(forecastList.weathercode[i]).innerHTML}</p>
                            <p class="${wmoASCII.get(forecastList.weathercode[i]).class}">${wmoASCII.get(forecastList.weathercode[i]).innerHTML}</p>
                            </div>
                        `
                    }

                }
            }
        }
        let endpoint = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&timezone=auto&current_weather=true&forecast_days=16&daily=temperature_2m_max,temperature_2m_min,weathercode";
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