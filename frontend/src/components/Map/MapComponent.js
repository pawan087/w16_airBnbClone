import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import getCenter from "geolib/es/getCenter";
import styles from "../Map/MapComponent.module.css";
import { useHistory } from "react-router";
export default function MapComponent({ id, lat, lng }) {
  const history = useHistory();
  // const spots = useSelector((state) => state.spot);
  // const spotsArr = Object.values(spots);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: lat,
    longitude: lng,
    zoom: 11,
  });
  const searchCriteria = useSelector((state) => state.search);
  const bookings = useSelector((state) => state.booking);
  const spots = useSelector((state) => state.spot);
  let searchedStartDate = searchCriteria.startDate;
  let searchedEndDate = searchCriteria.endDate;

  if (searchCriteria.startDate)
    searchedStartDate = searchedStartDate.toISOString().split("T")[0];
  if (searchCriteria.endDate)
    searchedEndDate = searchedEndDate.toISOString().split("T")[0];
  const [location, setLocation] = useState(searchCriteria.searchInput);
  const [startDate, setStartDate] = useState(searchedStartDate);
  const [endDate, setEndDate] = useState(searchedEndDate);
  const spotsArr = Object.values(spots);

  const bookingArr = Object.values(bookings);
  let spot = spots[id];
  let searchResultsObj = {};
  spotsArr.forEach((spot) => {
    if (spot.city === location) {
      searchResultsObj[spot.id] = spot;
    }
  });
  bookingArr.forEach((booking) => {
    if (booking["Spot"]["city"] === location && startDate && endDate) {
      if (booking.startDate < startDate && endDate < booking.endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (
        startDate < booking.startDate &&
        booking.startDate < endDate &&
        endDate < booking.endDate
      ) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (startDate < booking.startDate && booking.endDate < endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
      if (booking.startDate < startDate && booking.endDate < endDate) {
        // searchResultsObj[booking["Spot"]["id"]] = null;
        delete searchResultsObj[booking["Spot"]["id"]];
      }
    }
  });

  const arr = Object.values(searchResultsObj);
  //   const center = getCenter({})

  // const coordinates = spotsArr.map((spot) => ({
  //   longitude: +spot.lng,
  //   latitude: +spot.lat,
  // }));
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
      {arr.length === 0 && (
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

      {arr.map((x) => (
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
