import { useState } from "react";
import ReactMapGL from "react-map-gl";
import Pins from "./Pins";
import Header from "./Header";
import "./Map.css"

export default function Map() {
  const [currentUser, setCurrentUser] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/taesoo/ckomfhz8a36ed19qilwoawx7j"
      onDblClick={handleAddClick}
    >
      <Pins
        currentUser={currentUser}
        viewport={viewport}
        setViewport={setViewport}
        newPlace={newPlace}
        setNewPlace={setNewPlace}
      />
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </ReactMapGL>
  );
}
