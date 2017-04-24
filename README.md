
Name: Chicago for rent

Keywords: Economy, ease, rent, closeness

Description of the datasets and function design

[name] [link] [data type] [data columns used] [data amount] Please provide a name+link+basicInfo to each dataset you have used.

*[Crimes - 2001 to present] [https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2] [] [id, date, primary_type , description , year, location] [1000]

*[Affordable Rental Housing Developments] [https://data.cityofchicago.org/Community-Economic-Development/Affordable-Rental-Housing-Developments/s6ha-ppgi] [] [community_area,community_area_number,property_name,property_type,address,zip_code,phone_number,management_company,location][1000]

*[Connect Chicago Locations] [https://data.cityofchicago.org/Education/Connect-Chicago-Locations/qu9k-i56e] [] [website,organization_name,organization_type,full_address,address,org_phone,hours,agency_staff_person_contact_email ] [1000]

*[Libraries - Locations, Hours and Contact Information] [https://data.cityofchicago.org/Education/Libraries-Locations-Hours-and-Contact-Information/x8fc-8rcq/data] [] [name_,hours_of_operation,address,phone,website,cybernavigator,teacher_in_the_library,location] [1000]

*[Police Stations] [https://data.cityofchicago.org/Public-Safety/Police-Stations/9rg7-mz9y] [] [district,district_name,,address,zip,website,phone,fax,location] [1000]


[Y/N] Do you use the primary dataset ”online climate data” from data.gov?  YES

[Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
*The data sets that i use are from https://data.cityofchicago.org/


Brief Description
*My project wants to help the students who move to Chicago, finding a good, cheap (at least affordable), safe place to live


Fill in the structured description:

Map View:

*The map is center in Department of Computer Science – University of Illinois, Chicago (41.8708° N, 87.6505° W)

[Y/N] Markers for location of rent, crime, police, etc. places  YES
[Y/N] Labels for rent,crime, etc. places names YES
[Y/N] InfoWindow to show detail information of a rent, crime, etc. place YES
[Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect) NO

Data Visualization:

[Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...) I use a heat map, amd a radar chart
[Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)  toogle the heatmap on/off

Interaction Form:

[Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...) clicking in the conventions
[Y/N] [List] Any operation option (filters)?  YES
*Buttons for show and hide crime, rent, etc. places.
[Y/N] [List] Any information input? List them. (comments, markers, user preference ...) History of the rent places visited.
[Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...) Clicking a rent icon will show all markers within a 500 meter radius. 
[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...) Display the Radarchart


Test Case Which browsers did you test your project on?
Tested in Chrome, Edge and Firefox

I also use the open weather API (i know it isnt what we must use), but it doesnt work in the github page.

Link : https://judgarciani.github.io/

