import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

// the ref system allows us to get a reference to an HTML element that has been rendered
// to the page.  So this means that a div with a ref="map", I can reference it with this.refs.map
// class GoogleMap extends Component {
// 	componentDidMount() {
// 		new google.maps.Map(this.refs.map, {
// 			zoom: 12,
// 			center: {
// 				lat: this.props.lat,
// 				lng: this.props.lon
// 			}
// 		})

// 	}
// 	render() {
// 		return (
// 			<div ref="map" />
// 		);
// 	}

// }

export default (props) => {
	return (
		<GoogleMapLoader
			containerElement={ <div style={{ height: '100%'}} /> }
			googleMapElement={
				<GoogleMap defaultZoom={12} defaultCenter={{lat: props.lat, lng: props.lon}} />
			}
		/>
	)
}

