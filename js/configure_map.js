function configure_choropleth_map(map, layers, config) {
  function onLeafletRReady(oldvalue) {
      undefined === oldvalue && (oldvalue = map.leafletr.hasRendered);
      clearcheck = setInterval(repeatcheck,200,oldvalue);
      function repeatcheck(oldvalue) {
          if (map.leafletr.hasRendered !== oldvalue) {
              configure_choropleth_map_evented(map, layers, config)
              clearInterval(clearcheck);
          }
      }
  }
  
  if(map.leafletr.hasRendered) {
    configure_choropleth_map_evented(map, layers, config);
  } else {
    onLeafletRReady();
  }
}

function configure_choropleth_map_evented(map, layers, config) {
  map._custom_layer_settings = layers;
  
  let timelineControl;
  
  timeline_settings = {
      style: function style(feature) {
          return {
              fillColor: feature.properties.fillColor,
              weight: 1,
              opacity: 0.5,
              color: 'white',
              dashArray: '',
              fillOpacity: 1.0
          };
      },
      waitToUpdateMap: false,
      onEachFeature: function(feature, layer) {
        let link_filename = feature.properties.name.replace(/ /g,"_");
        let ci_text = "";
        
        if(feature.properties.CILow && feature.properties.CIUp) {
          ci_text = `(${feature.properties.CILow} - ${feature.properties.CIUp} 90% CI)`;
        }

        layer.bindPopup(`
                        <strong>${feature.properties.name}</strong><br><br>
                          ${feature.properties.description}:<br> 
                          ${feature.properties.valueFormatted} ${ci_text}
                          <br><br>
                            <a target='_blank' href="${config.link_folder}/${link_filename}.html">Details</a>
                            `);
                            
        layer.bindTooltip(feature.properties.name);
    },
  }
  
  timelineControl = L.timelineSliderControl({
      formatOutput: function(date) {
          return new Date(date).toLocaleDateString('en-GB');
      },
      enableKeyboardControls: true,
  });
  timelineControl.addTo(map);
  
  let timeline_layers = {};
  let timeline_control = {};
  let default_timeline;
  const title_box = L.control.textbox("Loading map", "h1", { position: 'topleft' }).addTo(map);
  const sub_title_box = L.control.textbox("", "h2", { position: 'topleft' }).addTo(map);
  const observation_prediction_box = L.control.textbox("", "h2", { position: 'bottomright' }).addTo(map);
  
  for (var layer of layers) {
    let timeline;
    
    if(layer.show_timeline[0]) {
       timeline = L.timeline(window[layer.varname], timeline_settings)
    } else {
       timeline = L.geoJSON(window[layer.varname], timeline_settings)
    }
    
    timeline.description = layer.description;
    timeline.varname = layer.varname;
    timeline.show_timeline = layer.show_timeline[0];
    timeline.show_observation_label = layer.show_observation_label[0];
    
    let timeline_group = L.layerGroup([timeline]);
    timeline_group.varname = layer.varname;
    timeline_group.description = layer.description;
    timeline_group.show_timeline = layer.show_timeline[0];
    timeline_group.show_observation_label = layer.show_observation_label[0];
    timeline_layers[layer.varname] = timeline_group;
    timeline_control[layer.display_name] = timeline_group;
    
    if(layer.default) {
      timeline_group.addTo(map);
      default_timeline = timeline;
    }
    
    if(layer.show_timeline[0]) {
      timeline.on('change', function(e) {
        let week_start;
        for (let i = 0; i < e.target.times.length - 1; i++) {
          let time = e.target.times[i];
          if(time <= e.target.time) {
            week_start = time;
            last_time = time;
          }
        }
        
        const week_start_date = new Date(week_start);
        const week_end_date = new Date(week_start);
        week_end_date.setDate(week_start_date.getDate() + 6); 
        
        const start_text = week_start_date.toLocaleDateString('en-GB');
        const end_text = week_end_date.toLocaleDateString('en-GB');
        sub_title_box.setText(`${start_text} - ${end_text}`);
        
        if(week_end_date > new Date(config.obsend)) {
          observation_prediction_box.setText('Projected');
        } else {
          observation_prediction_box.setText('Reported');
        }
      });
      
      timelineControl.addTimelines(timeline);
    }
  }
  
  L.control.layers(timeline_control, null, { collapsed: false }).addTo(map);
  timelineControl.setTime(new Date(config.initial_timeline_setting));
  
  title_box.setText(default_timeline.description);
  map.on('baselayerchange', function(e) {
    let layer = e.layer;
    let map = e.target;
    
    remove_all_legends(map);
    
    let legend = map.controls.get(layer.varname);
    map.addControl(legend);
    
    title_box.setText(layer.description);
    
    observation_prediction_box.setVisible(layer.show_observation_label);
    
    if(layer.show_timeline) {
      timelineControl.setTime(map._current_time);
      map.addControl(timelineControl);
      timelineControl.setTime(map._current_time);
    } else {
      let title_date = new Date(window[layer.varname].features[0].properties.end);
      title_date.setDate(title_date.getDate() -1)
      let title_text = title_date.toLocaleDateString('en-GB');
      sub_title_box.setText(title_text);
      map._current_time = timelineControl.time;
      map.removeControl(timelineControl);
    }
  });
  
  remove_all_legends(map);
  const default_legend = map.controls.get(default_timeline.varname);
  map.addControl(default_legend);
  
  L.control.zoom({
       position:'topleft'
  }).addTo(map);
}

function remove_all_legends(map) {
  for (const layer of map._custom_layer_settings) {
    const legend = map.controls.get(layer.varname);
    map.removeControl(legend);
  }
}

L.Control.textbox = L.Control.extend({
  initialize: function(text, tag, options) {
    this.text = text;
    this.visible = true;
    this.tag = tag;
    L.Util.setOptions(this, options);
    
    this._text_div = L.DomUtil.create('div');
    this._text_div.className = "leaflet_title";
  },
  
  _updateText: function() {
    this._text_div.innerHTML = `<${this.tag}>${this.text}</${this.tag}>`;
  },
  
  setText: function(text) {
    this.text = text;
    this._updateText();
  },
  
  setVisible: function(setting) {
    if(setting) {
      this._text_div.style.cssText = 'display: block;';
    } else {
      this._text_div.style.cssText = 'display: none;';
    }
  },
  
	onAdd: function(map) {
  	this._updateText();
  	return this._text_div;
	},

	onRemove: function(map) {
		// Nothing to do here
	}
});
L.control.textbox = function(text, tag, opts) { return new L.Control.textbox(text, tag, opts);}