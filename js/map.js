// Function to draw your map
var map;
var drawMap = function() {

  // Create map and set view
 
    map = L.map('container').setView([40, -100], 5)


  // Create a tile layer variable using the appropriate url

	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')


  // Add the layer to your map
 
  	layer.addTo(map)

  // Execute your function to get data
	getData();
}

    var data;

// Function for getting data
var getData = function() {

// Execute an AJAX request to get the data in data/response.js
$.ajax({
	url: 'data/response.json',
    type: 'get',
    success: function(response) {
    data = response;
    customBuild();
    },
    dataType:"json"
});


// When your request is successful, call your customBuild function
}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map  
	var shooting = new L.LayerGroup([]);
	var noShooting = new L.LayerGroup([]);
	var femaleShoot = 0;
	var maleShoot = 0;
	var femaleNoShoot = 0;
	var maleNoShoot = 0;
	for(i = 0; i < data.length; i++ ) {
		console.log(data[i]);
		if(data[i]["Shootings"] == "Yes") {	
			var circle = new L.circleMarker([data[i]["lat"], data[i]["lng"]], {color:"red", radius:2})
			circle.addTo(shooting);	
			if(data[i]["Victim's Gender"] == "Male"){
				maleShoot++;
			}else {
				femaleShoot++;
			}
		}else{
			var circle = new L.circleMarker([data[i]["lat"], data[i]["lng"]], {color:"black", radius:8})
			circle.addTo(noShooting);	
			if(data[i]["Victim's Gender"] == "Male") {
				maleNoShoot++;
			}else {
				femaleNoShoot++;
			}
		}
		circle.bindPopup(data[i]["Summary"]);
	}
	shooting.addTo(map);
	noShooting.addTo(map);

	var overlayMaps = {
	    "shootings": shooting,
	    "no-shootings":noShooting
	}
	L.control.layers(null, overlayMaps).addTo(map);

	$('#maleShoot').html(maleShoot);
	$('#femaleShoot').html(femaleShoot);
	$('#maleNoShoot').html(maleNoShoot);
	$('#femaleNoShoot').html(femaleNoShoot);

}
	// Once layers are on the map, add a leaflet controller that shows/hides layers

