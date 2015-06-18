FlockTo.Views.MapShow = Backbone.View.extend({
  attributes: {
    id: 'map-canvas'
  },

  initialize: function (options) {
    this._markers = {};
    this.currentModel = options.currentModel;
    this.eventModel = options.eventModel;
    this.isIndex = options.isIndex;
    this.listenTo(this.eventModel, 'sync', this.addMarker);
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  addMarker: function (meeting) {
    if (this._markers[meeting.id]) { return; }
    var view = this;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(meeting.get('latitude'), meeting.get('longitude')),
      map: this._map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: this.findProp(meeting.get('num_attendees')),
        fillColor: '#ff0000',
        fillOpacity: 0.5,
        strokeColor: '#ff0000',
        strokeOpacity: 0.5,
        strokeWeight: 1
      },
      title: meeting.get('title')
    });

    google.maps.event.addListener(marker, 'click', function (e) {
      view.showMarkerInfo(e, marker);
    });
  },

  addLines: function () {
    this.collection.each(function (model) {
      this.drawLine(model);
    }.bind(this));
  },

  drawLine: function (model) {
    var endpoints = []
    if (model.get('parent_id')) {
      var parent = this.collection.getOrFetch(model.get('parent_id'));
      endpoints = [
        new google.maps.LatLng(model.get('latitude'), model.get('longitude')),
        new google.maps.LatLng(parent.get('latitude'), parent.get('longitude'))
      ];
    } else {
      endpoints = [
        new google.maps.LatLng(model.get('latitude'), model.get('longitude')),
        new google.maps.LatLng(this.eventModel.get('latitude'), this.eventModel.get('longitude'))
      ];
    }

    var line = new google.maps.Polyline({
      path: endpoints,
      geodesic: false,
      strokeColor: '#ff0000',
      strokeOpacity: 0.35,
      strokeWeight: 0.2
    });

    line.setMap(this._map);
  },

  findProp: function (attendees) {
    var proportion = Math.pow(1.618, attendees);
    var x = proportion/20;
    var tempScaled = proportion / 2;
    return tempScaled >= 20 ? 20 : tempScaled;
  },

  indexZoom: function () {
    return (!this.isIndex) ? 5 : 3;
  },


  initialLat: function () {
    if (this.currentModel) {
      return this.currentModel.get('latitude');
    } else {
      var sum = 0;
      this.collection.each(function (mod) {
        sum += mod.get('latitude');
      });
      var avg = sum/(this.collection.length);
      return avg;
    }
  },

  initialLng: function () {
    if (this.currentModel) {
      return this.currentModel.get('longitude');
    } else if (this.eventModel) {
      return this.eventModel.get('longitude');
    } else {
      var sum = 0;
      this.collection.each(function (mod) {
        sum += mod.get('longitude');
      });
      var avg = sum/(this.collection.length);
      return avg;
    }
  },

  initMap: function () {
    var styledMap = new google.maps.StyledMapType(
      this.style(), {name: 'My map'});

    var mapOptions = {
      center: { lat: this.initialLat(), lng: this.initialLng()},
      zoom: this.indexZoom(),
      mapTypeControlOptions: {
        mapTypeId: [google.maps.MapTypeId.TERRAIN, 'map_style']
      }
    };


    this._map = new google.maps.Map(this.el, mapOptions);
    this._map.mapTypes.set('map_style', styledMap);
    this._map.setMapTypeId('map_style');


    this.collection.each(this.addMarker.bind(this));
    if (!this.isIndex) {
      this.addMarker(this.eventModel);
      this.collection.each(this.addLines.bind(this));
    }
  },

  removeMarker: function (meeting) {
    var marker = this._markers[meeting.id];
    marker.setMap(null);
    delete this._markers[meeting.id];
  },

  showMarkerInfo: function (e, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.get('title')
    });

    infoWindow.open(this._map, marker);
  },

  style: function () {
    return [
          {
              "featureType": "administrative",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "hue": "#0066ff"
                  },
                  {
                      "saturation": 74
                  },
                  {
                      "lightness": 100
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  },
                  {
                      "weight": 0.6
                  },
                  {
                      "saturation": -85
                  },
                  {
                      "lightness": 61
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "color": "#5f94ff"
                  },
                  {
                      "lightness": 26
                  },
                  {
                      "gamma": 5.86
                  }
              ]
          }
      ];
  }
});
