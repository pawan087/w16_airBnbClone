import { useState } from "react";
import ReactMapGL from "react-map-gl";
import { useSelector } from "react-redux";
import getCenter from "geolib/es/getCenter";
export default function MapComponent() {
  // const spots = useSelector((state) => state.spot);
  // const spotsArr = Object.values(spots);

  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 11,
  });

  //   const center = getCenter({})

  // const coordinates = spotsArr.map((spot) => ({
  //   longitude: +spot.lng,
  //   latitude: +spot.lat,
  // }));

  return (
    <ReactMapGL
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
      {...viewPort}
      mapStyle="mapbox://styles/pawan087/cktnrdl4f0jyb17mqmnp5osxq"
      mapboxApiAccessToken="pk.eyJ1IjoicGF3YW4wODciLCJhIjoiY2t0bnI5MDllMDVtajJ2cG0xbWNkaDIyMSJ9.ro5h9hxSsdwWYS0c9gbnEg"
    ></ReactMapGL>
  );
}
