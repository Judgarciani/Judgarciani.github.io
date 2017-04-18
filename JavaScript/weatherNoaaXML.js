function getWeather(map){
var xmlhttp = new XMLHttpRequest();
var url = "http://www.weather.gov/forecasts/xml/DWMLgen/wsdl/ndfdXML.wsdl";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);

        document.getElementById("weather").innerHTML = "In this moment the weather is: <b>" + json.weather[0].main + "</b>";
      }}}