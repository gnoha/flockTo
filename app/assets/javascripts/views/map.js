FlockTo.Views.MapShow = Backbone.View.extend({

  initialize: function (options) {
    this._markers = {};
    this.currentModel = options.currentModel;
    this.eventModel = options.eventModel;
    this.isIndex = options.isIndex;
    this.listenTo(this.collection, 'add', this.addMarker);
    // this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  attributes: {
    id: 'map-canvas'
  },

  addMarker: function (meeting, isEvent) {
    if (this._markers[meeting.id] && !isEvent) { return; }
    var color = '#0C555D';
    var url = '#/flocks/' + meeting.id + '>' + 'Flock Details';
    if (isEvent === true) {
      url = '#/events/' + meeting.id + '>' + 'Event Details';
      if (meeting.id === this.currentModel.id) {
        color = '#FF6860';
      }
    } else if (meeting.id === this.currentModel.id && !this.currentModel.isEvent()) {
      color = '#FF6860';
    }

    var view = this;
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(meeting.get('latitude'), meeting.get('longitude')),
      map: this._map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: this.findProp(meeting.get('num_attendees')),
        fillColor: color,
        fillOpacity: 0.75,
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 1
      },
      title: meeting.get('title'),
      location: meeting.get('location'),
      url: url
    });

    google.maps.event.addListener(marker, 'click', function (e) {
      view.showMarkerInfo(e, marker);
    });

    if (isEvent) {
      this._markers['event'] = marker;
    } else {
      this._markers[meeting.id] = marker;
    }
  },

  addLines: function () {
    this.collection.each(function (model) {
      this.drawLine(model);
    }.bind(this));
  },

  drawLine: function (model) {
    var endpoints = [];
    if (model.get('parent_id')) {
      var parent = this.collection.get(model.get('parent_id'));
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
      strokeColor: '#0C555D',
      strokeOpacity: 0.5,
      strokeWeight: 0.1
    });

    line.setMap(this._map);
  },

  findProp: function (attendees) {
    if (!this.isIndex) {
      var maxAttendees = this.eventModel.get('num_attendees');
      if (attendees > (maxAttendees * 0.5)) {
        return 15;
      } else if (attendees > (maxAttendees * 0.3)) {
        return 10;
      } else if (attendees > (maxAttendees * 0.1)) {
        return 8;
      } else if (attendees > (maxAttendees * 0.05)) {
        return 6;
      } else {
        return 4;
      }
    } else {
      return 20
    }
    // var proportion = Math.pow(1.618, attendees);
    // var newRad = proportion * this.scale;
    // // var tempScaled = proportion / 2;
    // return newRad <= 5 ? 5 : newRad;
  },

  indexZoom: function () {
    return (!this.isIndex) ? 4 : 2;
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


    if (this.isIndex) {
      this.collection.each(function (model) {
        this.addMarker(model, true);
      }.bind(this));
    } else if (!this.isIndex) {
      this.addMarker(this.eventModel, true);
      this.collection.each(this.addMarker.bind(this));
      this.collection.each(this.addLines.bind(this));
    }
  },

  removeMarker: function (meeting) {
    var marker = this._markers[meeting.id];
    marker.setMap(null);
    delete this._markers[meeting.id];
  },

  showMarkerInfo: function (e, marker) {
    var contentString = '<div id="marker-content">' +
    '<h3>' + marker.title + '</h3>' +
    '<p>' + marker.location + '</p>' +
    '<a href=' + marker.url + '</a>' +
    '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: contentString
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
                      "hue": "#E5E3DF"
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
                      "color": "#A3D3D2"
                  },
                  {
                      "lightness": 15
                  },
                  {
                      "gamma": 1
                  }
              ]
          }
      ];
  }
});
