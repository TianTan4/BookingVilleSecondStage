// import React from 'react'
// import { GoogleMap, useJsApiLoader,Marker  } from '@react-google-maps/api';

// const containerStyle = {
//   width: '1200px',
//   height: '1200px'
// };

// const center = {
//   lat: 0,
//   lng: 0
// };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyDgDau332Mb1yV5Rp-5EzUP0Jl4Kp-5pno"
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     map.panToBounds(bounds);
//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={1}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
       
//       >
//         { /* Child components, such as markers, info windows, etc. */ }
//         <Marker position={{ lat: -24.397, lng: 150.644 }} />
//         <></>
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(MyComponent)



import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

function  Map(){
    return (
        <GoogleMap
        
        defaultCenter={{lat: -24.397, lng: 150.644}}
        defaultZoom={10}
        
       
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{ lat: -24.397, lng: 150.644 }} />
        <></>
      </GoogleMap>
    )
}
const WrappedMap=withScriptjs(withGoogleMap(Map))
export default function App(){
   return (<div style={{width:'100vw',height:'100vh'}}>
       
   <WrappedMap
    googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDgDau332Mb1yV5Rp-5EzUP0Jl4Kp-5pno`}
    loadingElement= {<div style={{ height: `100%` }} />}
    containerElement={ <div style={{ height: `400px` }} />}
    mapElement={ <div style={{ height: `100%` }} />}
    ></WrappedMap>
    </div>
   )
}