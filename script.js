var lat = null;
var lon = null;

var geoRequest = new XMLHttpRequest();
geoRequest.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(this.responseText);
        //Check for error
		if(response.status !== 'success') {
			console.log('query failed: ' + response.message);
			return;
		}
		//Assign JSON coordinates to variables
        lat = response.lat;
		lon = response.lon;
	}
};
geoRequest.open('GET', "http://ip-api.com/json/?fields=status,lat,lon", true);
geoRequest.send();