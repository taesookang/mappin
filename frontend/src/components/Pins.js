import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import AddPin from "./AddPin";
import "./Pins.css";

export default function Pins({
  currentUser,
  viewport,
  setViewport,
  newPlace,
  setNewPlace,
}) {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
    });
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <>
      {pins.map((p, idx) => (
        <Fragment key={idx}>
          <Marker
            latitude={p.lat}
            longitude={p.long}
            offsetLeft={-viewport.zoom * 3.5}
            offsetTop={-viewport.zoom * 7}
          >
            <Room
              style={{
                fontSize: viewport.zoom * 7,
                color:
                  currentUser !== null && p.username === currentUser
                    ? "#ff6e40"
                    : "#0277bd",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              className="popup"
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <div>
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                </div>
                <div>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                </div>
                <div>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(parseInt(p.rating)).fill(<Star className="star" />)}
                  </div>
                </div>
                <div className="username">
                  <span>
                    Created by <b>{p.username ? p.username : "Unknown"}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </div>
            </Popup>
          )}
        </Fragment>
      ))}
      <AddPin
        newPlace={newPlace}
        setNewPlace={setNewPlace}
        pins={pins}
        setPins={setPins}
        currentUser={currentUser}
      />
    </>
  );
}
