/*    
                                       
                                       
ooo. .oo.  .oo.    .oooo.   oo.ooooo.  
`888P"Y88bP"Y88b  `P  )88b   888' `88b 
 888   888   888   .oP"888   888   888 
 888   888   888  d8(  888   888   888 
o888o o888o o888o `Y888""8o  888bod8P' 
                             888             
                            o888o            
*/                                            
var pos = {
    lat: 0,
    lng: 0
}

var address = "";
var name ="";

function initialize(){
    initMap();
    initMapTwo();
}

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos.lat = position.coords.latitude;
            pos.lng = position.coords.longitude;

                database.ref('userInfo').set({
                    positionLat: pos.lat,
                    positionLng: pos.lng
                });

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());});
    } else {// Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');

} // END initMap() function


function initMapTwo() {
    var map2 = new google.maps.Map(document.getElementById('map2'), {
        center: {lat: 40.5757706, lng: -74.35883439999999},
        zoom: 10
    }); //Close new map 

    var circle = new google.maps.Circle({
        map: map2,
        radius: 1609.34, // 10 miles in metres
        center: {
            lat: 40.5757706,
            lng: -74.35883439999999
        },
        strokeColor: '#009900',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#009900',
        fillOpacity: 0.7
    });
    //Circle 2
    var circle = new google.maps.Circle({
        map: map2,
        radius: 1609.34, // 10 miles in metres
        center: {
            lat: 40.497557799999996,
            lng: -74.4473483
        },
        strokeColor: '#009900',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#009900',
        fillOpacity: 0.7
    });
    //Circle 3
    var circle = new google.maps.Circle({
        map: map2,
        radius: 1609.34, // 10 miles in metres
        center: {
            lat: 40.534274,
            lng: -74.520258
        },
        strokeColor: '#009900',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#009900',
        fillOpacity: 0.7
    });
    //Circle 4
    var circle = new google.maps.Circle({
        map: map2,
        radius: 1609.34, // 10 miles in metres
        center: {
            lat: 40.585943,
            lng: -74.619274
        },
        strokeColor: '#009900',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#009900',
        fillOpacity: 0.7
    });
    //Circle 5
    var circle = new google.maps.Circle({
        map: map2,
        radius: 1609.34, // 10 miles in metres
        center: {
            lat: 40.628732,
            lng: -74.410394
        },
        strokeColor: '#009900',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#009900',
        fillOpacity: 0.7
    });
    //Circle 6
    var circle = new google.maps.Circle({
        map: map2,
        radius: 1609.34, // 10 miles in metres
        center: {
            lat: 40.474823,
            lng: -74.539483
        },
        strokeColor: '#009900',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#009900',
        fillOpacity: 0.7
    }); // End Circles
                    
    var geocoder = new google.maps.Geocoder;
      
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map2, infowindow);

} // End InitMap2() function 

function geocodeLatLng(geocoder, map, infowindow) {
  database.ref('userInfo').on("value", function(snapshot) {
    
  
  var input = (snapshot.val().positionLat + "," + snapshot.val().positionLng)
  
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    
    address = results[0].formatted_address;

    database.ref('userAddress').set({
    address: results[0].formatted_address
    });

    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(10);
        
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });

        database.ref('user').on("child_added", function(snapshot){
            name = snapshot.val();
        
        infowindow.setContent(snapshot.val() + "<br>" + results[0].formatted_address);
        infowindow.open(map, marker);
        })

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
  });

} // End geocodeLatLng() function.
    