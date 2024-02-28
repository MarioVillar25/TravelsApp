const bcrypt = require("bcrypt");
const connection = require("../config/bd");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserControllers {
  register = (req, res) => {
    console.log(req.body);
    console.log("hola");
    const { name, email, password } = req.body;
    //guardar los datos en la bd (password tengo que encriptarlo)
    let saltRounds = 8;

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          res.status(500).json(err);
        }
        console.log(hash);
        let sql = `INSERT INTO user (name, email, password) VALUES ("${name}", "${email}", "${hash}" )`;
        connection.query(sql, (error, result) => {
          error ? res.status(500).json(error) : res.status(200).json(result);
        });
      });
    });
  };

  login = (req, res) => {
    console.log("holaaaa");
    const { email, password } = req.body;
    console.log("req.body", req.body);
    let sql = `SELECT * FROM user WHERE email = "${email}"`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(401).json("Usuario no autorizado");
      } else {
        console.log("result", result);
        const hash = result[0].password;
        bcrypt.compare(password, hash, (errHash, response) => {
          if (errHash) {
            res.status(500).json(errHash);
          }
          if (response) {
            //mandar token
            const token = jwt.sign(
              {
                user: {
                  id: result[0].user_id,
                  //type: result[0].type,
                },
              },
              process.env.SECRET,
              { expiresIn: "5d" }
            );

            res.status(200).json({ token, user: result[0] });

            console.log("TOKEN", token);
          } else {
            res.status(401).json("usuario no autorizado");
          }
        });
      }
    });
  };

  getOneUser = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM user WHERE user_id = ${id} AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result[0]);
        console.log("result usuarui", result[0]);
      }
    });
  };

  edit = (req, res) => {


    const {name, lastname, address, user_city, user_id} = JSON.parse(req.body.editUser) 
    console.log("req.body", req.body.editUser);
    console.log("req.file", req.file);

   
    let img = "";

    if(req.file != undefined){
      img = `, user_img = "${req.file.filename}"`
    }

    let sql = `UPDATE user SET name = "${name}", lastname = "${lastname}", address = "${address}", user_city = "${user_city}" ${img} WHERE user_id = ${user_id}`

    console.log("sql", sql);

    connection.query(sql, (err, result)=>{

      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json({result, newImg: req.file?.filename})
      }

      console.log("RESULT", result);





    })









  }



}

module.exports = new UserControllers();
