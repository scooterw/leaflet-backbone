leaflet-backbone allows you to use a Backbone View as a Leaflet overlay / popup

Full constructor (new keyword): `new L.BackboneViewLayer();`
Convenience method (no new keyword): `L.backboneViewLayer();`

You may pass in an instantiated view, or an uninstantiated view (with or without a model / collection).

The model may be a model or a collection, and the layer initialization will detect and apply the proper type to the view.

On adding the layer to the map, the render() method of the view will be called. The map and layer will be passed in to the method, and will be accessible at this._map, and this._mapLayer.

```javascript
// full constructor, uninstantiated view, model

map.addLayer(new L.BackboneViewLayer(latlng, App.MyPopupView, myModel));
```

```javascript
// convenience method, instantiated view

map.addLayer(L.backboneViewLayer(latlng, new App.MyPopupView({model: myModel})));
```
