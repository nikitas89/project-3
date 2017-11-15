$(document).on('turbolinks:load', function() {
  console.log('script.js loaded');
  $(".shareGroup").hide()
  $( ".shareToggle" ).click(function() {
    var thisClass = $(this).attr("data-id")
    $(`.shareGroup.${thisClass}`).toggle("slow");
});

});
