import axios from "axios";
import React, { useEffect, useState } from "react";
import "./imgGallery.scss";
import { Button } from "react-bootstrap";

export const ImgGallery = ({ travel_id }) => {
  const [pictures, setPictures] = useState([]);

  const [addedPictures, setAddedPictures] = useState();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/travels/getPicsOneTravel/${travel_id}`)
      .then((res) => {
        console.log("RES.DATA", res.data);
        setPictures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const delPic = (id) => {
    axios
      .put("http://localhost:3000/travels/delPic", { id })
      .then((res) => {
        setPictures(pictures.filter((e) => e.picture_id != id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFiles = (e) => {
    //setAddedPictures(e.target.files)
    //setShowButton(true)

    const uploads = e.target.files;

    const newFormData = new FormData();
    if (uploads) {
      for (const elem of uploads) {
        newFormData.append("file", elem);
      }
    }

    axios
      .post(
        `http://localhost:3000/travels/AddPictures/${travel_id}`,
        newFormData
      )
      .then()
      .catch();
  };

  return (
    <div className="imgGalleryMain">
      {pictures.map((e) => {
        return (
          <div key={e.picture_id} className="foto">
            <div className="cont-foto">
              <img
                src={`http://localhost:3000/images/travels/${e.picture_img}`}
                alt=""
              />
              <div onClick={() => delPic(e.picture_id)} className="basura">
                <img src="/public/assets/icons/borrar.png" alt="" />
              </div>
            </div>
          </div>
        );
      })}

      <label htmlFor="images"> Add photo</label>

      <input id="images" multiple hidden onChange={handleFiles} type="file" />
    </div>
  );
};
