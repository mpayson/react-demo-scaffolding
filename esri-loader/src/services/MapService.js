// following this: https://github.com/Esri/esri-loader#using-classes-synchronously

import {loadModules} from 'esri-loader';
import options from '../config/esri-loader-options';

let _pModules;
// mapping
let _Map, _MapView;

export function preloadAllModules(){
  _pModules = loadModules([
    // mapping
    'esri/Map',
    'esri/views/MapView',
  ], options)
  .then(([
    Map,
    MapView,
  ]) => {
    _Map = Map;
    _MapView = MapView;
  });
  return _pModules;
}

function _loadAllModules(){
  return _pModules ? _pModules : preloadAllModules();
}

export async function loadMap(container, mapOptions, viewOptions){
  await _loadAllModules();
  const map = new _Map(mapOptions);
  const view = new _MapView({
    map,
    container,
    ...viewOptions
  });
  return view;
}