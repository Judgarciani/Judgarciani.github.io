var Max20;
var Min20;
var PRCP20;
var Max18;
var Min18;
var PRCP18;
var Max15;
var Min15;
var PRCP15;
var Max13;
var Min13;
var PRCP13;

function getWeatherNoaa(map){

	$.ajax({
		url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datatypeid=TMAX&datatypeid=TMIN&datatypeid=PRCP",
		type: "GET",
		data: {	
			locationid:	"CITY:US170006",
			datasetid: "GHCND",
			stationid : "GHCND:USC00110442",
			startdate: "2017-04-13",
			enddate: "2017-04-20",
			limit: 1000,
			units: "metric"
		},
		headers:{
			"token": "KbmXNIipAyJIYJAULTFptMihdTvoZLuX"
		}
	}).done(function(data) {
		console.log("This chicago data was taken from the noaa");
		console.log(data)
		for (var i = 0; i < data.results.length; i++) {
			if (data.results[i].date == "2017-04-13T00:00:00"){
				if(data.results[i].datatype=="PRCP")
					PRCP13 = data.results[i].value;
				else if(data.results[i].datatype=="TMAX")
					Max13 = data.results[i].value;
				else if(data.results[i].datatype=="TMIN")
					Min13 = data.results[i].value;
			} else if (data.results[i].date == "2017-04-15T00:00:00"){
				if(data.results[i].datatype=="PRCP")
					PRCP15 = data.results[i].value;
				else if(data.results[i].datatype=="TMAX")
					Max15 = data.results[i].value;
				else if(data.results[i].datatype=="TMIN")
					Min15 = data.results[i].value;
			} else if (data.results[i].date == "2017-04-18T00:00:00"){
				if(data.results[i].datatype=="PRCP")
					PRCP18 = data.results[i].value;
				else if(data.results[i].datatype=="TMAX")
					Max18 = data.results[i].value;
				else if(data.results[i].datatype=="TMIN")
					Min18 = data.results[i].value;
			} else if (data.results[i].date == "2017-04-20T00:00:00"){
				if(data.results[i].datatype =="PRCP")
					PRCP20 = data.results[i].value;
				else if(data.results[i].datatype=="TMAX")
					Max20 = data.results[i].value;
				else if(data.results[i].datatype=="TMIN")
					Min20 = data.results[i].value;
			}
		};   
	});
}

function alertWeather(){

	alert( 	"WEATHER:\n\n13 of April Weather:\n    Maximum temperature: "+ Max13 + " Cº\n    Minimum temperature: "+Min13+" Cº\n    Precipitation: " + PRCP13 + " milimeters" +
		"\n\n* 15 of April Weather:\n    Maximum temperature: "+ Max15 + " Cº\n    Minimum temperature: "+Min15+" Cº\n    Precipitation: " + PRCP15 + " milimeters" +
		"\n\n* 18 of April Weather:\n    Maximum temperature: "+ Max18 + " Cº\n    Minimum temperature: "+Min18+" Cº\n    Precipitation: " + PRCP18 + " milimeters" +
		"\n\n* 20 of April Weather:\n    Maximum temperature: "+ Max20 + " Cº\n    Minimum temperature: "+Min20+" Cº\n    Precipitation: " + PRCP20 + " milimeters" );
}
