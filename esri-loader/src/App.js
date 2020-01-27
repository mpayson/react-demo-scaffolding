import React, {PureComponent} from 'react';
import Loader from './components/Loader';
import styled from 'styled-components';
import {loadMap} from './services/MapService';

const MapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1D2224;
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

  async componentDidMount(){
    const mapOptions = {basemap: 'dark-gray-vector'};
    const viewOptions = {center: [-118.23722, 34.04568], zoom: 8};
    this.view = await loadMap(this.mapViewRef.current, mapOptions, viewOptions);
    this.map = this.view.map;
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