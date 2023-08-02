//WMO ASCII art
const wmoASCII = new Map();
wmoASCII.set(0,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(1,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(45,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(51,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(56,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(61,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(66,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(71,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(77,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(80,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(85,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(95,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)
wmoASCII.set(96,
    {
        class: 'sunny',
        innerHTML:
            "&nbsp&nbsp\\ &nbsp  /"   +"<br>"+
            "&nbsp&nbsp&nbsp.-."     +"<br>"+
            "― ( &nbsp ) ―"  +"<br>"+
            "&nbsp&nbsp&nbsp`-’"     +"<br>"+
            "&nbsp&nbsp/  &nbsp \\ "
    }
)


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
                    document.body.innerHTML+=`<p class="${wmoASCII.get(0).class}">${wmoASCII.get(0).innerHTML}</p>`
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
