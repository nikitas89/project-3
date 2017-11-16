$(document).on('turbolinks:load', function() {
  console.log('script.js loaded');

  $(".shareGroup").hide()
  $(".shareToggle").click(function() {
    var thisClass = $(this).attr("data-id")
    $(`.shareGroup.${thisClass}`).toggle("slow");
  });

  const $newRestaurantButton = $('#newRestaurantButton');
  var restaurantIndex = 1;
  $newRestaurantButton.on('click', () => {
    if (restaurantIndex < nearbyRestaurantsList.length) {
      // remove all map markers
      removeMapMarkers();
      // get next restaurant to make a marker for
      var nextRestaurant = nearbyRestaurantsList[restaurantIndex];
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
});
