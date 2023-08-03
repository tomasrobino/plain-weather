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

                    //Today's weather
                    document.body.innerHTML+=`<p class="${wmoASCII.get(95).class}">${wmoASCII.get(95).innerHTML}</p>`
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
