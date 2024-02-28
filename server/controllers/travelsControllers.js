const connection = require("../config/bd");

class TravelsControllers {
  createTravel = (req, res) => {
    console.log("REEEQ.BODY", JSON.parse(req.body.regTravel));
    console.log("REEEQ.FILE", req.files);

    const { travel_city, country, description, user_id } = JSON.parse(
      req.body.regTravel
    );

    let sql = `INSERT INTO travel (travel_city, country, description, user_id ) VALUES ("${travel_city}", "${country}" ,"${description}", ${user_id}) `;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        let travel_id = result.insertId;
        try {
          this.saveTravelImages(req.files, travel_id, res);
        } catch (err) {
          res.status(500).json(err);
        }

        res.status(200).json(travel_id);
      }
    });
  };

  saveTravelImages = (images, travel_id, res) => {
    images.forEach((img) => {
      let sql = `INSERT INTO picture (picture_img, travel_id) VALUES ('${img.filename}', '${travel_id}') `;
      connection.query(sql, (error, result) => {
        if (error) {
          res.status(500).json(error);
        }
      });
    });
  };

  travelsOneUser = (req, res) => {
    console.log("estoy en get travekl");
    console.log("REQ.PARAMS", req.params);
    const { user_id } = req.params;
    let sql = `SELECT * FROM travel WHERE user_id = ${user_id} AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  getPicsOneTravel = (req, res) => {
    const { travel_id } = req.params;

    let sql = `SELECT * FROM picture where travel_id = ${travel_id} AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  editTravel = (req, res) => {
    const { travel_id, country, travel_city, description } = req.body;

    let sql = `UPDATE travel SET travel_city= '${travel_city}', country= '${country}', description= '${description}' WHERE travel_id = ${travel_id} `;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  delTravel = (req, res) => {
    const { id } = req.body;

    let sql = `UPDATE travel LEFT JOIN picture ON travel.travel_id = picture.travel_id SET travel.is_deleted = 1, picture.is_deleted = 1 WHERE travel.travel_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  delPic = (req, res) => {
    const { id } = req.body;

    let sql = `UPDATE picture SET is_deleted = 1 WHERE picture_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  addPictures = (req, res) => {
    console.log(req.params);
    console.log(req.files);

    let travel_id = req.params.id;

    let imgs = req.files;
    imgs.forEach((img) => {
      let sql = `INSERT INTO picture (picture_img, travel_id) VALUES
      ('${img.filename}'), ('${travel_id}') `;

      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          null;
        }
      });
    });

    res.status(200).json("todo ok");
  };
}

module.exports = new TravelsControllers();
