import React, { useState } from "react";
import { Popup } from "react-map-gl";
import axios from "axios";
import './AddPin.css'

export default function AddPin({
  newPlace,
  setNewPlace,
  pins,
  setPins,
  currentUser,
}) {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    newPlace && (
      <Popup
        className="popup"
        latitude={newPlace.lat}
        longitude={newPlace.long}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={() => setNewPlace(null)}
      >
        <div>
          <form className="addPinForm" onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              className="titleInput"
              type="text"
              placeholder="Enter a title."
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Review</label>
            <textarea
              placeholder="Describe this place."
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              style={{ resize: "none" }}
            ></textarea>
            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="submitButton" type="submit">
              Add Pin
            </button>
          </form>
        </div>
      </Popup>
    )
  );
}
