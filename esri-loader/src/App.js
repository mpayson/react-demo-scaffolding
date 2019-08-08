import React, {PureComponent} from 'react';
import Loader from './components/Loader';
import styled from 'styled-components';
import {loadModules} from 'esri-loader';
import options from './esri-loader-options';

const MapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: #373938;
`

class App extends PureComponent {
  constructor(props){
    super(props);
    this.mapViewRef = React.createRef();
    this.state = {
      loaded: false
    }
    this._onMapLoad = this._onMapLoad.bind(this);
  }

  _onMapLoad(){
    this.setState({loaded: true});
  }

  componentDidMount(){
    loadModules(['esri/Map', 'esri/views/MapView'], options)
      .then(([Map, MapView]) => {
        this.map = new Map({
          basemap: 'dark-gray-vector'
        });
        this.view = new MapView({
          map: this.map,
          container: this.mapViewRef.current,
          center: [-118.23722, 34.04568],
          zoom: 8
        });
        this.view.when(this._onMapLoad);
      })
      .catch(er => console.log(er));
  }

  render(){
    return(
      <>
        {!this.state.loaded && <Loader/>}
        <MapDiv ref={this.mapViewRef}/>
      </>
    )
  }

}

export default App;