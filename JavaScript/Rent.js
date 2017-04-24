 var rentMarker = [];
 var rentMarkerVisited = [];
 var repeat = false;
 var selected ;
 var Rentdistance;
 var pos_University;
 var pos_B;
 var crimesNearby;
 var policeStationsNearby;
 var connectNearby;
 var libraryNearby;
 var parkNearby;
 var rentNumber;
 var score;
 var cheapestRentNumber;
 var cheapestRent;

 function getRent(map){
 	$.ajax({
 		url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
 		type: "GET",
 		data: {
 			"$limit" : 1000,
 			"$$app_token" : "0JZQkOpCfiZ221meZTVm0tMag"
 		}
 	}).done(function(data) {
 		cheapestRent = 2000;
 		for (var i = 0; i <= data.length; i++) {
 			if (data[i]){
 				var marker = new google.maps.Marker({
 					position: new google.maps.LatLng(data[i].latitude,data[i].longitude),
 					map: map,
 					title: data[i].address,
 					icon: "Images/rentIcon.png"
 				});
 				rentMarker[i]= marker;
 				if(data[i].latitude){
 					rentMarker[i].latitude= data[i].latitude;
 					rentMarker[i].longitude= data[i].longitude;
 					if(i!=0 && communityprice[data[i].community_area_number] < cheapestRent){
 						cheapestRent = communityprice[data[i].community_area_number];
 						cheapestRentNumber = i;
 					}
 				}
 				createInfoRent(marker,data[i]);
 			}

 		}; 

 	});
 }


 function toogleRentMarkers() {
 	for (var i = 0; i < rentMarker.length; i++) {
 		if(rentMarker[i].getVisible()) 
 			rentMarker[i].setVisible(false);
 		else 
 			rentMarker[i].setVisible(true);
 	}
 }



 var prev_infowindow ;

 function createInfoRent(marker, data) {

 	var infowindow = new google.maps.InfoWindow({
 		content: ""
 	});

 	google.maps.event.addListener(marker, 'click', function() {
 		if( prev_infowindow != undefined) {
 			prev_infowindow.close();
 		}
 		prev_infowindow = infowindow;
 		infowindow.setContent(data.address);
 		infowindow.open(marker.get("map"), marker);
 		pos_University = new google.maps.LatLng(41.8708,-87.6505);
 		pos_B = new google.maps.LatLng(data.latitude,data.longitude);
 		getDistance(pos_University,pos_B);
 		var distance = Rentdistance;
 		showNearby(data);
 		showInfo(data,distance,score);
 		radarDraw(rentNumber); 

 		for (var i = rentMarkerVisited.length - 1; i >= 0; i--) {
 			if (rentMarkerVisited[i] == data){
 				repeat = true;
 				break;
 			}
 			else { 
 				repeat = false; 
 			}
 		}

 		rentMarkerVisited.push(data);
 		
 		rentMarkerVisited[rentMarkerVisited.length -1].crimesNearby = crimesNearby;
 		rentMarkerVisited[rentMarkerVisited.length -1].policeStationsNearby = policeStationsNearby;
 		rentMarkerVisited[rentMarkerVisited.length -1].connectNearby = connectNearby;
 		rentMarkerVisited[rentMarkerVisited.length -1].libraryNearby = libraryNearby;
 		rentMarkerVisited[rentMarkerVisited.length -1].parkNearby = parkNearby;
 		rentMarkerVisited[rentMarkerVisited.length -1].score = score;
 		rentVisited();
 		pos_B = new google.maps.LatLng(rentMarkerVisited[rentMarkerVisited.length - 1].latitude,rentMarkerVisited[rentMarkerVisited.length - 1].longitude);
 		getDistance(pos_University,pos_B);
 		var visitRent = document.createElement("a");
 		visitRent.setAttribute("class","list-group-item");
 		this.crimesNearby=crimesNearby;
 		this.policeStationsNearby=policeStationsNearby;
 		this.connectNearby=connectNearby;
 		this.libraryNearby=libraryNearby;
 		this.parkNearby=parkNearby;
 		this.score=score;
 		visitRent.setAttribute("onclick"," getHistory(this)");
 		if(communityprice[data.community_area_number] == 600){
 			 visitRent.innerHTML = "<h4 class=list-group-item-heading>" + rentMarkerVisited[rentMarkerVisited.length - 1].property_name +" &nbsp &nbsp*Cheapest Rent Place"+"</h4><p class=list-group-item-text>"+rentMarkerVisited[rentMarkerVisited.length - 1].address+
 			"</p><p> Distance to the University :"+ Rentdistance+" meters &nbsp &nbsp &nbsp Rent Rating :"+ score+"</p>";

 		}else{ 		
 			visitRent.innerHTML = "<h4 class=list-group-item-heading>" + rentMarkerVisited[rentMarkerVisited.length - 1].property_name +"</h4><p class=list-group-item-text>"+rentMarkerVisited[rentMarkerVisited.length - 1].address+
 			"</p><p> Distance to the University :"+ Rentdistance+" meters &nbsp &nbsp &nbsp Rent Rating :"+ score+"</p>";
 		}

 			visitRent.marker = data;

 			if (!repeat)
 				$("#history").append(visitRent);	  
 		});
 }

 function showInfo(data,distance,score){

 	document.getElementById("1").innerHTML = "<b>Comunity area name:</b> " + data.community_area ;
 	document.getElementById("2").innerHTML = "<b>Comunity area number:</b> " + data.community_area_number ;
 	document.getElementById("3").innerHTML = "<b>Property type:</b> " + data.property_type ;
 	document.getElementById("4").innerHTML = "<b>Property name:</b> " + data.property_name ;
 	document.getElementById("5").innerHTML = "<b>Address:</b> " + data.address ;
 	document.getElementById("6").innerHTML = "<b>Zip code:</b> " + data.zip_code ;
 	document.getElementById("7").innerHTML = "<b>Phone number:</b> " + data.phone_number ;
 	document.getElementById("8").innerHTML = "<b>Management company:</b> " + data.management_company ;
 	document.getElementById("9").innerHTML = "<b>Distance to the University:</b> " + distance + " meters";
 	document.getElementById("10").innerHTML = "<b><em>Estimated price: </em></b>" + communityprice[data.community_area_number] + '&#36';	
 	document.getElementById("11").innerHTML = "<h4>Rent rating: " + score + "</h4>";
 	document.getElementById("12").innerHTML = "<b>Number of closest places: </b>";

 }


 function rentVisited() {
 	var lastMarkerVisited;
 	if(rentMarkerVisited.length > 1)
 		lastMarkerVisited= rentMarkerVisited[rentMarkerVisited.length - 2];
 	else
 		lastMarkerVisited= rentMarkerVisited[rentMarkerVisited.length - 1];

 	pos_University = new google.maps.LatLng(41.8708,-87.6505);
 	pos_B = new google.maps.LatLng(lastMarkerVisited.latitude,lastMarkerVisited.longitude);
 	getDistance(pos_University,pos_B);
 	for (var k = 0 ; k <= rentMarker.length - 1; k++) {
 		if (rentMarker[k].latitude == lastMarkerVisited.latitude && rentMarker[k].longitude == lastMarkerVisited.longitude){
 			rentNumber = k;
 			break;
 		}		
 	}

 	radarDrawHistory(lastMarkerVisited); 
 	document.getElementById("mem1").innerHTML = "<b>Comunity area name:</b> " + lastMarkerVisited.community_area ;
 	document.getElementById("mem2").innerHTML = "<b>Comunity area number:</b> " + lastMarkerVisited.community_area_number ;
 	document.getElementById("mem3").innerHTML = "<b>Property type:</b> " + lastMarkerVisited.property_type ;
 	document.getElementById("mem4").innerHTML = "<b>Property name:</b> " + lastMarkerVisited.property_name ;
 	document.getElementById("mem5").innerHTML = "<b>Address:</b> " + lastMarkerVisited.address ;
 	document.getElementById("mem6").innerHTML = "<b>Zip code:</b> " + lastMarkerVisited.zip_code ;
 	document.getElementById("mem7").innerHTML = "<b>Phone number:</b> " + lastMarkerVisited.phone_number ;
 	document.getElementById("mem8").innerHTML = "<b>Management company:</b> "+ lastMarkerVisited.management_company ;
 	document.getElementById("mem9").innerHTML = "<b>Distance to the University:</b> " + Rentdistance + " meters";
 	document.getElementById("mem10").innerHTML = "<b><em>Estimated price: </em></b>" + communityprice[lastMarkerVisited.community_area_number]+'&#36';
 	document.getElementById("mem11").innerHTML = "<h4>Rent rating: "+ lastMarkerVisited.score + "</h4>";
 	document.getElementById("mem12").innerHTML = "<b>Number of closest places: </b>";
 }


 function getHistory(info){
 	rentNumber=0;
 	info.setAttribute("class","list-group-item active");
 	if(selected != undefined){
 		selected.setAttribute("class","list-group-item");
 	}
 	selected = info;
 	var rentNumberHist=0;
 	for (var j = 0 ; j <= rentMarker.length - 1; j++) {
 		if (rentMarker[j].latitude == info.marker.latitude && rentMarker[j].longitude == info.marker.longitude){
 			rentNumberHist = j;
 			break;
 		}		
 	}
 	radarDrawHistory(info.marker); 
 	document.getElementById("mem1").innerHTML = "<b>Comunity area name:</b> " + info.marker.community_area ;
 	document.getElementById("mem2").innerHTML = "<b>Comunity area number:</b> " + info.marker.community_area_number ;
 	document.getElementById("mem3").innerHTML = "<b>Property type:</b> " + info.marker.property_type ;
 	document.getElementById("mem4").innerHTML = "<b>Property name:</b> " + info.marker.property_name ;
 	document.getElementById("mem5").innerHTML = "<b>Address:</b> " + info.marker.address ;
 	document.getElementById("mem6").innerHTML = "<b>Zip code:</b> " + info.marker.zip_code ;
 	document.getElementById("mem7").innerHTML = "<b>Phone number:</b> " + info.marker.phone_number ;
 	document.getElementById("mem8").innerHTML = "<b>Management company:</b> " + info.marker.management_company ;
 	document.getElementById("mem9").innerHTML = "<b><em>Estimated price: </em></b>" + communityprice[info.marker.community_area_number]+'&#36';
 	document.getElementById("mem10").innerHTML = "<br>";	
 	document.getElementById("mem11").innerHTML = "<h4>Rent rating: " + info.marker.score + "</h4>";
 	document.getElementById("mem12").innerHTML = "<b>Number of closest places:</b>";


 }

 function getDistance(pos_A, pos_B){

 	Rentdistance = (google.maps.geometry.spherical.computeDistanceBetween (pos_A, pos_B)).toFixed(0);

 }


 function showNearby(data){
 	var pos_A = new google.maps.LatLng(data.latitude,data.longitude);
 	crimesNearby = 0;
 	policeStationsNearby = 0;
 	connectNearby = 0;
 	libraryNearby = 0;
 	parkNearby = 0;
 	rentNumber = 0;
 	score = 0;
 	for (var j = 0 ; j <= rentMarker.length - 1; j++) {
 		if (rentMarker[j].latitude == data.latitude && rentMarker[j].longitude == data.longitude){
 			rentNumber = j;
 			break;
 		}		
 	}
 	for (var i = 0; i < markers.length; i++) {

 		if(markers[i].type == "library" || markers[i].type == "park")
 			pos_B = new google.maps.LatLng(markers[i].data.location.coordinates[1],markers[i].data.location.coordinates[0]);
 		else
 			pos_B = new google.maps.LatLng(markers[i].data.latitude,markers[i].data.longitude);


 		getDistance(pos_A,pos_B);


 		if (Rentdistance <= 500){

 			if(markers[i].type == "crime"){

 				if(!markers[i].getVisible()) 
 					markers[i].setVisible(true);
 				crimesNearby++;
 			}else if(markers[i].type == "police"){

 				if(!markers[i].getVisible()) 
 					markers[i].setVisible(true);
 				policeStationsNearby++;
 			}else if(markers[i].type == "connect"){

 				if(!markers[i].getVisible()) 
 					markers[i].setVisible(true);
 				connectNearby++;
 			}else if(markers[i].type == "library"){

 				if(!markers[i].getVisible()) 
 					markers[i].setVisible(true);
 				libraryNearby++;
 			}else if(markers[i].type == "park"){

 				if(!markers[i].getVisible()) 
 					markers[i].setVisible(true);
 				parkNearby++;
 			}
 		} 
 		else 
 			markers[i].setVisible(false);

 		rentMarker[rentNumber].crimesNearby = crimesNearby;
 		rentMarker[rentNumber].policeStationsNearby = policeStationsNearby;
 		rentMarker[rentNumber].connectNearby = connectNearby;
 		rentMarker[rentNumber].libraryNearby = libraryNearby;
 		rentMarker[rentNumber].parkNearby = parkNearby;
 		score = (-2*crimesNearby) + (2*policeStationsNearby) + connectNearby + libraryNearby + parkNearby;
 		rentMarker[rentNumber].score = score;
 	}

 }

 function alertRent(){
 	alert( "Showing " + rentMarker.length + " rent places! \nClicking on a rent marker will show all markers within a 500 meter radius"  );
 }

 function centerCheapPlace(cheapestRentNumber){
 	var latC = rentMarker[cheapestRentNumber].latitude;
 	var lonC = rentMarker[cheapestRentNumber].longitude;
 	console.log("Cheapest location: latitude: " +latC+ " longitude: "+lonC);
 	map.setCenter(new google.maps.LatLng(latC, lonC));


 }