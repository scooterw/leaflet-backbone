(function (window) {
  L.BackboneViewLayer = L.Class.extend({
    initialize: function (latlng, view, model) {
      this._latlng = latlng;

      if (view instanceof Backbone.View) {
        this._view = view;
      } else {
        var viewOptions = {};

        if (model) {
          if (model instanceof Backbone.Model) {
            viewOptions.model = model;
          } else if (model instanceof Backbone.Collection) {
            viewOptions.collection = model;
          }
        }

        this._view = new view(viewOptions);
      }
    },
    onAdd: function (map) {
      this._map = map;

      this._el = this._view.render(map, this).el;

      map._panes.overlayPane.appendChild(this._el);
      map.on('viewreset', this._reset, this);
      this._reset();
    },
    onRemove: function (map) {
      map.getPanes().overlayPane.removeChild(this._el);
      map.off('viewreset', this._reset, this);

      this._view.close();
      if (this._view.onClose) this._view.onClose();
    },
    _reset: function () {
      var pos = this._map.latLngToLayerPoint(this._latlng);
      L.DomUtil.setPosition(this._el, pos);
    }
  });

  L.backboneViewLayer = function (latlng, view, model) {
    return new L.BackboneViewLayer(latlng, view, model);
  };
})(window);
