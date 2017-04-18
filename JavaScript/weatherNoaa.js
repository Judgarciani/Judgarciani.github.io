function getWeatherNoaa(map){

	$.ajax({
		url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/CITY:US170006",
		type: "GET",
		data: {		},
		headers:{
			"token": "KbmXNIipAyJIYJAULTFptMihdTvoZLuX"
		}
	}).done(function(data) {
		console.log("This chicago data was taken from the noaa");
		console.log(data);
		for (var i = 0; i <= data.length; i++) {
			if(data[i]){
				//document.getElementById("weatherNoaa").innerHTML = "In this moment the weather is: <b>" + data[i] + "</b>";
			}
		};          
	});

}


