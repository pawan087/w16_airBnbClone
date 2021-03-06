import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import getCenter from "geolib/es/getCenter";

import styles from "../Map/MapComponent.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function MapComponent({ id, lat, lng }) {
  const history = useHistory();
  const { spotId } = useParams();

  const [selectedLocation, setSelectedLocation] = useState({});

  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: lat,
    longitude: lng,
    zoom: spotId ? 11 : 6,
  });

  const spots = useSelector((state) => state.spot);
  const searchResults = useSelector((state) => state.searchResults);
  const searchCriteria = useSelector((state) => state.search);
  const usersBookings = useSelector((state) => state.userBookings);
  const bookings = Object.values(usersBookings);
  let spot = spots[id];
  const searchResultsArr = Object.values(searchResults);

  const unavailableBookings = [];

  bookings?.forEach((booking) => {
    let x = new Date(booking.startDate);
    let y = new Date(booking.endDate);

    let sd = new Date(searchCriteria.startDate);
    let ed = new Date(searchCriteria.endDate);

    if (x.getTime() <= sd.getTime() && ed.getTime() <= y.getTime()) {
      unavailableBookings.push(booking.spotId);
      return;
    }

    if (
      sd.getTime() <= x.getTime() &&
      x.getTime() <= ed.getTime() &&
      ed.getTime() <= y.getTime()
    ) {
      unavailableBookings.push(booking.spotId);
      return;
    }
    if (sd.getTime() <= x.getTime() && y.getTime() <= ed.getTime()) {
      unavailableBookings.push(booking.spotId);
      return;
    }
    if (
      x.getTime() <= sd.getTime() &&
      y.getTime() <= ed.getTime() &&
      sd.getTime() <= y.getTime()
    ) {
      unavailableBookings.push(booking.spotId);

      return;
    }
    return;
  });

  const filteredSearchResults = searchResultsArr.filter((searchResult) => {
    if (spotId) {
      return (
        !unavailableBookings.includes(searchResult.id) &&
        searchResult.id === spotId
      );
    }

    return !unavailableBookings.includes(searchResult.id);
  });

  const linkMe = (e, id) => {
    e.preventDefault();
    history.push(`/spots/${id}`);
  };

  return (
    <ReactMapGL
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
      {...viewPort}
      mapStyle="mapbox://styles/pawan087/cktnrdl4f0jyb17mqmnp5osxq"
      mapboxApiAccessToken="pk.eyJ1IjoicGF3YW4wODciLCJhIjoiY2t0bnI5MDllMDVtajJ2cG0xbWNkaDIyMSJ9.ro5h9hxSsdwWYS0c9gbnEg"
    >
      {filteredSearchResults?.length === 0 && (
        <div key={spot?.lat}>
          <Marker
            longitude={+spot?.lng}
            latitude={+spot?.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p onClick={() => setSelectedLocation(spot)} className={styles.pin}>
              ????
            </p>
          </Marker>

          {selectedLocation?.lng === spot?.lng ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={+spot?.lat}
              longitude={+spot?.lng}
              className={styles.popUp}
            >
              {spot.name}
            </Popup>
          ) : (
            false
          )}
        </div>
      )}

      {filteredSearchResults?.map((x) => (
        <div key={x.lat}>
          <Marker
            longitude={+x?.lng}
            latitude={+x?.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p onClick={() => setSelectedLocation(x)} className={styles.pin}>
              ????
            </p>
          </Marker>

          {selectedLocation?.lng === x?.lng ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={+x?.lat}
              longitude={+x?.lng}
              className={styles.popUp}
              onClick={(e) => linkMe(e, x?.id)}
            >
              {x.name}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
