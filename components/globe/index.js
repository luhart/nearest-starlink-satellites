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
    fetch(process.env.NEXT_PUBLIC_PATH_TO_API + "/get_all_sats")
      .then(response => response.json())
      .then(response => this.setMarkers(response.sats))
  }

  setMarkers(sats) {
    let markers = [];
    Object.keys(sats).forEach(item => {
      markers.push({
        id: item,
        coordinates: sats[item],
        value: 15,
        color: "#50E3C2"
      })
    });
    this.setState({markers: markers})
  }

  render() {
    let content = ( 
      <>
        <RingLoader color="#50E3C2" loading={this.state.loading} size={200} />
        <ReactGlobe height="80vh" width="80vw" markers={this.state.markers} options={options} onGlobeBackgroundTextureLoaded={() => {this.setState({loading: false})}}/>
      </>
    )

    return (
      <div className={styles.content}>
        {content}
      </div>
    )
  }
}