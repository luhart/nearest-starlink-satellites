import React from 'react'
import dynamic from 'next/dynamic'
import RingLoader from 'react-spinners/RingLoader';
import styles from './globe.module.css'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ReactGlobe = dynamic(() => import('react-globe'), {
  ssr: false
});

const options = {
  cameraRotateSpeed: 0.5,
  focusAnimationDuration: 2000,
  focusEasingFunction: ['Linear', 'None'],
  markerTooltipRenderer: marker => `id: ${marker.id} - lat/long:${marker.coordinates}`,
};

export default class Globe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      nearest_sats: {},
      markers: []
    }

    this.getSats = this.getSats.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
  }

  componentDidMount() {
    this.getSats();
    this.setState({loading: false});
  }

  getSats() {
    fetch("http://0.0.0.0:8000/get_all_sats")
      .then(response => response.json())
      .then(response => this.setMarkers(response.sats))
  }
/*
{
  id: 'marker1',
  city: 'Singapore',
  color: 'red',
  coordinates: [1.3521, 103.8198],
  value: 50,
},
{
  id: 'marker2',
  city: 'New York',
  color: 'blue',
  coordinates: [40.73061, -73.935242],
  value: 25,
},
*/
  setMarkers(sats) {
    let markers = [];
    Object.keys(sats).forEach(item => {
      markers.push({
        id: item,
        coordinates: sats[item],
        value: 20,
        color: "blue"
      })
    });
    this.setState({markers: markers})
  }

  render() {
    //console.log(this.state.markers)
    let content;
    if (this.state.loading === true || this.state.markers.length < 5) {
      content = <RingLoader color="#50E3C2" loading={true} size={200} />
    } else {
      content = <ReactGlobe height="80vh" width="100vw" markers={this.state.markers} options={options}/>
    }

    return (
      <div className={styles.content}>
        {content}
      </div>
    )
  }
}