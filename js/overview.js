$( document ).ready(function() {
  setTimeout(function(){ window.scrollTo(0, 0); }, 1500);
  
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

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}