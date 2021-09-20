import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

import styles from "../Map/MapComponent.module.css";

export default function MapComponent({ id, lat, lng }) {
  const history = useHistory();

  const [selectedLocation, setSelectedLocation] = useState({});
  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: lat,
    longitude: lng,
    zoom: 11,
  });


  const searchCriteria = useSelector((state) => state.search);
  const spots = useSelector((state) => state.spot);
  const searchResults = useSelector((state) => state.searchResults);

  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];

  let spot = spots[id];
  const searchResultsArr = Object.values(searchResults);

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
      {searchResultsArr.length === 0 && (
        <div key={spot.lat}>
          <Marker
            longitude={+spot.lng}
            latitude={+spot.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p onClick={() => setSelectedLocation(spot)} className={styles.pin}>
              📌
            </p>
          </Marker>

          {selectedLocation.lng == spot.lng ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={+spot.lat}
              longitude={+spot.lng}
              className={styles.popUp}
            >
              {spot.name}
            </Popup>
          ) : (
            false
          )}
        </div>
      )}

      {searchResultsArr.map((x) => (
        <div key={x.lat}>
          <Marker
            longitude={+x.lng}
            latitude={+x.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p onClick={() => setSelectedLocation(x)} className={styles.pin}>
              📌
            </p>
          </Marker>

          {selectedLocation.lng == x.lng ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={+x.lat}
              longitude={+x.lng}
              className={styles.popUp}
              onClick={(e) => linkMe(e, x.id)}
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
