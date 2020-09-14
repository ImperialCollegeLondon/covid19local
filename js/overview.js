$( document ).ready(function() {
  setTimeout(function(){ window.scrollTo(0, 0); }, 1500);
  
  $("#Cweek2").addClass("cases_button_active");
  
  $('.navbar').on('click', 'a', function(e) {
    /* Workaround for missed leaflet map redraws when only using the css
    display property to control the navigation flow / elem visibility */
      window.dispatchEvent(new Event('resize'));
  });
  
  loadRegions();
  
  setTimeout(subPageAnalytics(), 6000);
  console.log($("#navbar"));
  
  regionFilterAnalytics();
 
  linkSharingButton('#table-sharing-btn');
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

function loadRegions() {
  var _paq = window._paq = window._paq || [];
  let urlParams = new URLSearchParams(window.location.search);
  let regions = urlParams.getAll('region');
  
  try {
    if (regions && regions.length) {
      $("#region-select select")[0].selectize.setValue(regions);
      regions.map(region => _paq.push(['trackEvent', 'Region', 'QueryParam', region]));
    }
  } 
  catch(err) {
    console.log("Invalid region list supplied in query param");  
    regions.map(region => _paq.push(['trackEvent', 'Region', 'QueryParamError', region]));
  }
}

function subPageAnalytics() {
  var registered_nav_links = [];
  var currentUrl = location.href;
  
  $("#navbar").bind("DOMSubtreeModified", function() {
    $("#navbar a").each(function() {
      
      if(!registered_nav_links || !registered_nav_links.includes(this)) {
        let page = $( this ).text();
        this.addEventListener('click', function() {
              var _paq = window._paq = window._paq || [];
              _paq.push(['setReferrerUrl', currentUrl]);
               currentUrl = '/' + page;
              _paq.push(['setCustomUrl', currentUrl]);
              _paq.push(['deleteCustomVariables', 'page']); 
              _paq.push(['setGenerationTimeMs', 0]);
              _paq.push(['trackPageView']);
        });
        
        registered_nav_links.push(this);
      }
      
    });
  });
}

function regionFilterAnalytics() {
  $("#region-select select")[0].selectize.on('item_add', function(value, item) {
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackEvent', 'Region', 'ItemAdd', value]);
  });
  
  $("#region-select select")[0].selectize.on('item_remove', function(value, item) {
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackEvent', 'Region', 'ItemRemove', value]);
  });
}

function linkSharingButton(button_id) {
  new ClipboardJS(button_id, {
    text: function(trigger) {
      var _paq = window._paq = window._paq || [];
      const regions = $("#region-select select")[0].selectize.getValue();
      const params = new URLSearchParams();
      regions.map(region => params.append('region', region));
      
      const target_url = `https://imperialcollegelondon.github.io/covid19local/?${params.toString()}#table`;
      
      $(button_id).tooltip('show');
      setTimeout(function(){ $(button_id).tooltip('hide'); }, 2000);
      _paq.push(['trackEvent', 'Region', 'CopyLink', regions.toString()]);
      
      return target_url;
    }
  });
  
  $(button_id).tooltip({
    "trigger": "manual",
    "delay": { "show": 200, "hide": 200 }
  });
}