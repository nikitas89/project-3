// script for google maps

// creating variables
var map, currentPos, userInfoWindow, restoInfoWindow, currentPosMarker, nearbyRestaurantsList, markers = [];
// initialise map
function initMap() {
  // setting default location if current user location is not found
  var defaultPosition = new google.maps.LatLng(1.360630, 103.812509);
  map = new google.maps.Map(document.getElementById('map'), {
    center: defaultPosition,
    zoom: 10,
    gestureHandling: 'cooperative',
    styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#75808e'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#454b54'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#7c9977'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#afb7c2'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#afb7c2'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#afb7c2'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#465d7a'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#1f2835'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#465d7a'
        }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#45628f'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#b1c8eb'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#17263c'
        }]
      }
    ]
  });
  // initialise infowindow and setting information
  userInfoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // gets current location and save in var pos
      currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // set current map position since current user location is found
      map.setCenter(defaultPosition);
      map.setZoom(12);

      // creating custom marker for current user and adding marker to map
      currentPosMarker = customMarker(currentPos);
      markers.push(currentPosMarker);

      // currentPosMarker.setMap(map);

      // adding infowindow to current user location marker
      google.maps.event.addListener(currentPosMarker, 'click', function() {
        userInfoWindow.setContent('Current location');
        userInfoWindow.open(map, this);
      });

      // getting nearby restaurants if user not logged in
      if (!gon.current_user) getNearbyRestaurants(currentPos);

      // else {
      //   var centralLocation = getCenterLocation(currentPos, map);
      //   // get restaurants near centerLocation
      //   getNearbyRestaurants(centralLocation);
      // }

      // setting all markers after everything is done
      setMapMarkers();
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function getNearbyRestaurants(location) {
  // set to empty array
  nearbyRestaurantsList = [];
  // create request object
  var request = {
    location: location,
    radius: '5000',
    keyword: ['restaurant', 'cafe'],
    openNow: true
  };
  // create new restaurant infowindow
  restoInfoWindow = new google.maps.InfoWindow();
  // searching nearby restaurants with currentPos
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((result) => {
      nearbyRestaurantsList.push(result);
    })
  }
  // create marker for first restaurant (pushes marker into markers array)
  var len = nearbyRestaurantsList.length;
  if (len > 0) {
    var restaurant = nearbyRestaurantsList[0];
    createMarker(restaurant);
    // $.ajax({
    //   data: {
    //     "resto_name": restaurant.name
    //   },
    //   dataType: 'json',
    //   type: 'post',
    //   url: "/selected_restaurant"
    // });
  }
  // only update restaurant pane if user is logged in
  if (gon.current_user) {
    updateRestaurantPane(nearbyRestaurantsList);
  }
  const $titleBoardText = $('#titleBoardText');
  console.log(nearbyRestaurantsList[0].name);
  $titleBoardText.text(`Goto: ${nearbyRestaurantsList[0].name}`)
}

function updateRestaurantPane(restaurantsList) {
  $('#restaurantsList').empty();
  restaurantsList.forEach((restaurant) => {
    // target restaurantsList pane
    var restaurantsList = document.getElementById('restaurantsList');
    // create new li element
    var listItem = document.createElement("li");
    listItem.innerHTML = restaurant.name;
    listItem.setAttribute("class", "list-group-item");
    restaurantsList.appendChild(listItem);
  })
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  // push created marker into markers array
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
    restoInfoWindow.setContent(place.name);
    restoInfoWindow.open(map, this);
  });
}

function getCenterLocation(position, map) {
  // push position into userPositionsList array
  // userPositionsList.push(position);
  // create bounds object

  var bound = new google.maps.LatLngBounds();
  // extend bounds using each position object in array
  groupLocationsList.forEach(function(userPosition) {

    bound.extend(new google.maps.LatLng(userPosition))
  });
  // using bounds object, getCenter
  var centerLocation = bound.getCenter();
  // post user location
  $.ajax({
    data: position,
    dataType: 'json',
    type: 'post',
    url: "/user_location/"
  });

  return centerLocation;
}

function customMarker(location) {
  // create a custom icon
  var icon = {
    url: "/img/pin-two.png",
    scaledSize: new google.maps.Size(25, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };
  // create marker using custom icon
  var newCustomMarker = new google.maps.Marker({
    position: location,
    icon: icon
  });

  return newCustomMarker;
}

function handleLocationError(browserHasGeolocation, infoWindow, currentPos) {
  infoWindow.setPosition(currentPos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function groupLocations() {
  // $.get("/gon_locations").then(() => console.log(gon.group_locations))
  console.log(gon.group_locations)
}

function setMapMarkers() {
  markers.forEach((marker) => {
    marker.setMap(map);
  })
}

function removeMapMarkers() {
  markers.forEach((marker) => {
    marker.setMap(null);
  })
  // empties markers array (need to populate markers array again to drop new markers)
  markers = [];
}
