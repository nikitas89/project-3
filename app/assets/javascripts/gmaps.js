// script for google maps

// creating variables
var map, userInfoWindow, restoInfoWindow, currentPosMarker;

// initialise map
function initMap() {
  // defaultPos set to GA
  var defaultPosition = new google.maps.LatLng(1.3077785,103.832118);

  // setting default location if current user location is not found
  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultPosition,
    zoom: 18
  });

  // initialise infowindow and setting information
  userInfoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // gets current location and save in var pos
      var currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // set current map pos since current user location is found
      map = new google.maps.Map(document.getElementById('map'), {
        center: currentPos,
        zoom: 18
      });

      // create marker for current user position
      currentPosMarker = new google.maps.Marker({
        position: currentPos,
        title:'Current location'
      });
      // adding marker to map
      currentPosMarker.setMap(map);
      // adding infowindow to current user location marker
      google.maps.event.addListener(currentPosMarker, 'click', function() {
        userInfoWindow.setContent('Current location');
        userInfoWindow.open(map, this);
      });

      // // setting current user position infowindow
      // currentPosMarker.setPosition(currentPos); // set position of infowindow
      // currentPosMarker.setContent('Current location'); // set content of infowindow
      // currentPosMarker.open(map); // open map with location in infowindow


      // create request object
      var request = {
        location: currentPos,
        radius: '500',
        type: ['restaurant'],
        openNow: true
      };


      // set restaurant infowindow
      restoInfoWindow = new google.maps.InfoWindow();

      // searching nearby restaurants with currentPos
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

      // setting positon of map
      map.setCenter(currentPos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    restoInfoWindow.setContent(place.name);
    restoInfoWindow.open(map, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, currentPos) {
  infoWindow.setPosition(currentPos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
