$(document).on('turbolinks:load', function() {
  console.log('script.js loaded');

  // $(".shareGroup").hide()
  // $(".shareToggle").click(function() {
  //   var thisClass = $(this).attr("data-id")
  //   $(`.shareGroup.${thisClass}`).toggle("slow");
  // });

  // event listener to get new restaurant
  const $newRestaurantButton = $('#newRestaurantButton');
  var restaurantIndex = 1;
  $newRestaurantButton.on('click', () => {
    if (restaurantIndex < nearbyRestaurantsList.length) {
      // remove all map markers
      removeMapMarkers();
      // get next restaurant to make a marker for
      var nextRestaurant = nearbyRestaurantsList[restaurantIndex];
      // update title pane
      const $titleBoardText = $('#titleBoardText');
      $titleBoardText.text(`Goto: ${nearbyRestaurantsList[restaurantIndex].name}`)
      // make a marker for the next restaurant
      createMarker(nextRestaurant);
      // push custom marker for current user location into markers array again
      markers.push(currentPosMarker);
      // set the markers on the map
      setMapMarkers();

      // increment restaurant index
      restaurantIndex++;
      // if reached end of nearbyRestaurantsList, start from beginning if button is clicked again
      if (restaurantIndex === nearbyRestaurantsList.length) restaurantIndex = 0;
    }
  })

  // event listener to send group id back to server
  const $groupTab = $('.groupTab');
  $groupTab.on('click', function() {
    var groupId = $(this).attr('aria-controls')
    // console.log('this: ', groupId);
    // to get all group member's location
    $.when($.ajax(
      {
        data: { "id": groupId },
        dataType: 'json',
        type: 'post',
        url: "/groups_locations"
      }
    ))
    .then(() => {
      console.log('post request to /groups_locations completed');
      // use groupLocationsList, get centerLocation, get getNearbyRestaurants, removeMapMarkers, set new markers, setMapMarkers
      // set zoom level and center of map

      var centralLocation = getCenterLocation(currentPos, map)
      // console.log('centralLocation: ', centralLocation);
      // get restaurants near centerLocation
      getNearbyRestaurants(centralLocation);
    })
  })
});
