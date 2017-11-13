// script for google maps
var map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 18
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //activate form with post request to ctrl
      sendPos(pos)

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function sendPos(position){
  //send random locations for dev purpose, mimic users at diff group_locations
  console.log(position.lat);
  console.log(position.lng);
  var locList  =
  [{'lat': 1.3306435,'lng': 103.9060051},
  {'lat': 1.2965676,'lng': 103.8499297},
  {'lat': 1.3659974,'lng': 103.8533953}]
  console.log('got location '+position);
  var position = locList[Math.round(Math.random()*2)]
  $.ajax({
    data: position,
    dataType: 'json',
    type: 'post',
    url: "/groups_locations"
  });
}

$(document).ready(function() {
  console.log('script.js loaded');


})
