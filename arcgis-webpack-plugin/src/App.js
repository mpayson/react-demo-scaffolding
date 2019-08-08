import React, {PureComponent} from 'react';
import Loader from './components/Loader';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import styled from 'styled-components';

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