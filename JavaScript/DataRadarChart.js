var w = 350,
h = 350;

var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

//Legend titles
var LegendOptions = ['Close places'];

//Data
var d = [
[
{axis:"Crimes",value:3},
{axis:"Police Stations",value:2},
{axis:"Libraries",value:0},
{axis:"Parks",value:1},
{axis:"Connect locations",value:4},
]
];

var e = [
[
{axis:"Crimes",value:3},
{axis:"Police Stations",value:2},
{axis:"Libraries",value:0},
{axis:"Parks",value:1},
{axis:"Connect locations",value:4},
]
];

//Options for the Radar chart, other than default
var mycfg = {
	w: w,
	h: h,
	maxValue: 0.6,
	levels: 6,
	ExtraWidthX: 500
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
function radarDraw(rentNumber){
	d = [			
	[
	{axis:"Crimes",value:rentMarker[rentNumber].crimesNearby},
	{axis:"Police Stations",value:rentMarker[rentNumber].policeStationsNearby},
	{axis:"Libraries",value:rentMarker[rentNumber].libraryNearby},
	{axis:"Parks",value:rentMarker[rentNumber].parkNearby},
	{axis:"Connect locations",value:rentMarker[rentNumber].connectNearby}
	]
	]
	RadarChart.draw("#chart", d, mycfg);
}

function radarDrawHistory(lastMarkerVisited){
	d = [
	[
	{axis:"Crimes",value:lastMarkerVisited.crimesNearby},
	{axis:"Police Stations",value:lastMarkerVisited.policeStationsNearby},
	{axis:"Libraries",value:lastMarkerVisited.libraryNearby},
	{axis:"Parks",value:lastMarkerVisited.parkNearby},
	{axis:"Connect locations",value:lastMarkerVisited.connectNearby}
	]
	]
	RadarChart.draw("#chartHistory", d, mycfg);
}

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
.selectAll('svg')
.append('svg')
.attr("width", w+30)
.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
.attr("class", "title")
.attr('transform', 'translate(90,0)') 
.attr("x", w - 70)
.attr("y", 10)
.attr("font-size", "12px")
.attr("fill", "#404040")
.text("What % of owners use a specific service in a week");

//Initiate Legend	
var legend = svg.append("g")
.attr("class", "legend")
.attr("height", 100)
.attr("width", 200)
.attr('transform', 'translate(90,20)') 
;
	//Create colour squares
	legend.selectAll('rect')
	.data(LegendOptions)
	.enter()
	.append("rect")
	.attr("x", w - 65)
	.attr("y", function(d, i){ return i * 20;})
	.attr("width", 10)
	.attr("height", 10)
	.style("fill", function(d, i){ return colorscale(i);})
	;
	//Create text next to squares
	legend.selectAll('text')
	.data(LegendOptions)
	.enter()
	.append("text")
	.attr("x", w - 52)
	.attr("y", function(d, i){ return i * 20 + 9;})
	.attr("font-size", "11px")
	.attr("fill", "#737373")
	.text(function(d) { return d; })
	;	