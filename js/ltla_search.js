$(function() {
  const options = {
    includeScore: true,
    ignoreLocation: true,
    // Search in `author` and in `tags` array
    keys: ['name']
  };
  
  const fuse = new Fuse(ltla_search_data, options);
  
  const ltla_fuse_search = function(query, callback) {
    const result = fuse.search(query).map(item => {
      return item.item.name;
    });
    
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackSiteSearch', query, "Area", result.length]);
    
    callback(result);
  };
  
  $('#ltlaSearch .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'ltla_search_engine',
    source: ltla_fuse_search
  });
  
  $('#ltlaSearch .typeahead').bind('typeahead:select', function(ev, suggestion) {
    const link_filename = suggestion.replace(/ /g,"_");
    const link_folder = 'LTLA_public';
    let nav_target;
    if (window.location.href.indexOf(`${link_folder}/`) != -1) {
      nav_target = `${link_filename}.html`;
    } else {
      nav_target = `${link_folder}/${link_filename}.html`;
    }
    
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackEvent', 'Navigation', 'SearchBox', link_filename]);
    
    window.location.href = nav_target;
  });
});


