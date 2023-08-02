var lat = null;
var lon = null;

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
        lat = response.lat;
		lon = response.lon;

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
                }
            }
        }
        let endpoint = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&hourly=temperature_2m";
        weatherRequest.open("GET", endpoint, true);
        weatherRequest.send();
	}
};

geoRequest.open('GET', "http://ip-api.com/json/?fields=status,lat,lon", true);
geoRequest.send();
