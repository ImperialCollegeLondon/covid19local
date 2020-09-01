$( document ).ready(function() {
  $("#Cweek2").addClass("cases_button_active");
  
  $('.navbar').on('click', 'a', function(e) {
    /* Workaround for missed leaflet map redraws when only using the css
    display property to control the navigation flow / elem visibility */
      window.dispatchEvent(new Event('resize'));
  });
});

function showCases(target_id) {
  var target_class = "." + target_id;
  $(".Ctoggle").not(target_class).addClass("hidden");
  $(target_class).removeClass("hidden");
  
  $(".cases_button").not("#" + target_id).removeClass("cases_button_active");
  $("#" + target_id).addClass("cases_button_active");
  
  window.dispatchEvent(new Event('resize'));
}