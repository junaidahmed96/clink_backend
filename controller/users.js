const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { has } = require("underscore");
const path = require("path");
var nodemailer = require("nodemailer");
var ejs = require("ejs");

module.exports = {
  addUser: async (req, res) => {
    console.log(req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let address = req.body.address;
    let phone = req.body.phone || "03242193350" ;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let password = req.body.password;
    let city = req.body.city;
    let country = req.body.country;
    let type = req.body.type;
    let avatar = req.body.avatar;

    let creationDate = new Date();
    if (phone) {
      let myQuery = "SELECT * FROM users where phone=" + "'" + phone + "'";

      db.query(myQuery, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send({
            success: "false",
            message: "ASDsda",
            err:err
          });
        }
        else if (result.length > 0) {
          res.status(409).send({
            success: "false",
            message: "Phone number already exists",
          });
        }
        else {
          if (email) {
            let myQuery = "SELECT * FROM users where email=" + "'" + email + "'";
            console.log(myQuery);
            db.query(myQuery, (err, result) => {
              if (err) {
                console.log(err);
                return res.status(400).send({
                  success: "false",
                  message: "ASDsda",
                  err:err
                });
              }
              if (result.length > 0) {
                res.status(409).send({
                  success: "false",
                  message: "Email already exists",
                });
              }
              else {
                if (address) {
                  if (password) {
                    bcrypt.hash(password, 10, function (err, hash) {
                      // console.log("ASD");
                      if (err) {
          console.log(err);

                        res.status(500).send({
                          success: "false",
                          message: "ASDsda1123",
                        });
                      } else {
                        let query =
                          "INSERT INTO users(firstName,avatar,lastName,email,password,address,phone,lat,lng,creationDate,city,country,type) VALUES('" +
                          firstName +
                          "','" +
                          avatar +
                          "','" +
                          lastName +
                          "','" +
                          email +
                          "','" +
                          hash +
                          "','" +
                          address +
                          "','" +
                          phone +
                          "','" +
                          lat +
                          "','" +
                          lng +
                          "','" +
                          creationDate +
                          "','" +
                          city +
                          "','" +
                          country +
                          "','" +
                          type +
                          "')";
                        console.log("test",query);
                        db.query(query, (err, result) => {
                          if (err) {
                  console.log(err);

                            return res.status(400).send({
                              success: "false",
                              message: err,
                              error: "Is here",
                            });
                          } else {
                            return res.status(201).send({
                              success: "true",
                              message: "user added succesfully",
                              id: result.insertId,
                            });
                          }
                        });
                      }
                    });
                  }
                  else {
                    res.status(409).send({
                      success: "false",
                      message: "password required required exists",
                    });
                  }
                }
                else {
                  res.status(409).send({
                    success: "false",
                    message: "address required exists",
                  });
                }
              }
            })
          }
        }
      })
    } else {
      res.status(400).send({
        success: "false",
        message: "username is required",
      });
    }
  },
  signUp: async (req, res) => {
    console.log(req.body);
   
    let email = req.body.email;
    let password = req.body.password;
    let age = req.body.age;
    let type=req.body.type;
    let user_ID=req.body.user_ID||Math.floor(Math.random()*(999-100+1)+100);;


    let creationDate = new Date();
    if (email) {
      db.query( (err, result) => {
      
     
        
          if (email) {
            let myQuery = "SELECT * FROM users where email=" + "'" + email + "'";
            console.log(myQuery);
            db.query(myQuery, (err, result) => {
              if (err) {
                console.log(err);
                return res.status(400).send({
                  success: "false",
                  message: "ASDsda",
                });
              }
              if (result.length > 0) {
                res.status(409).send({
                  success: "false",
                  message: "Email already exists",
                });
              }
              else {
              
                  
                    bcrypt.hash(password, 10, function (err, hash) {
                      // console.log("ASD");
                      if (err) {
          console.log(err);

                        res.status(500).send({
                          success: "false",
                          message: "ASDsda1123",
                        });
                      } else {
                        let query =
                          "INSERT INTO users(email,password,creationDate,age,type,user_ID) VALUES('" +
                          email +
                          "','" +
                          hash +
                          "','" +
                          creationDate +
                          "','" +
                          age +
                          "','" +
                          type +
                          "','" +
                          user_ID +
                          "')";
                        console.log("test",query);
                        db.query(query, (err, result) => {
                          if (err) {
          console.log(err);

                            return res.status(400).send({
                              success: "false",
                              message: err,
                              error: "Is here",
                            });
                          } else {
                            return res.status(201).send({
                              success: "true",
                              message: "user added succesfully",
                              id: result.insertId,
                            });
                          }
                        });
                      }
                    });
                 
                
                
              }
            })
          
        }
      
    })
  }else {
      res.status(400).send({
        success: "false",
        message: "email is required",
      });
    }
  },
  editUser: (req, res) => {
    console.log(req.body);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let address = req.body.address;
    let phone = req.body.phone;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let city = req.body.city;
    let country = req.body.country;
    let avatar = req.body.avatar;
    // UPDATE Customers
    // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    // WHERE CustomerID = 1;
    let query =
      "UPDATE user SET firstName = " +
      "'" +
      firstName +
      "'" +
      "," +
      "lastName=" +
      "'" +
      lastName +
      "'" +
      "," +
      "email=" +
      "'" +
      email +
      "'" +
      "," +
      "avatar=" +
      "'" +
      avatar +
      "'" +
      "," +
      "address=" +
      "'" +
      address +
      "'" +
      "," +
      "phone=" +
      "'" +
      phone +
      "'" +
      "," +
      "lat=" +
      "'" +
      lat +
      "'" +
      "," +
      "lng=" +
      "'" +
      lng +
      "'" +
      "," +
      "city=" +
      "'" +
      city +
      "'" +
      "," +
      "country=" +
      "'" +
      country +
      "'" +
      " WHERE userID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "user edited succesfully",
          id: result,
        });
      }
    });
  },
  getUsers: (req, res) => {
    let query =
      "SELECT * FROM users WHERE type = 'user'"
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  getUser: (req, res) => {
    let query =
      "SELECT * FROM users WHERE userID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          // message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  deleteUser: (req, res) => {
    let query =
      "DELETE FROM user WHERE userID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          // message: "company added succesfully",
          result: result,
        });
      }
    });
  },

  checkEmail: (req, res) => {
    let query = "SELECT * FROM user WHERE email=" + "'" + req.params.id + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        if (result.length > 0) {
          res.status(200).send({
            success: "true",
            result: result,
          });
        }
        else {
          res.status(200).send({
            success: "false",
            // result: result,
          });
        }

      }
    });
  },
  forgotPassword: (req, res) => {
    let query = "SELECT * FROM users WHERE email=" + "'" + req.body.email + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        if (result.length > 0) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              res.status(500).send({
                success: "false",
                message: "ASDsda1123",
              });
            } else {
              let query =
                "UPDATE users SET password = " +
                "'" +
                hash +
                "'" +
                " WHERE email=" +
                "'" +
                req.body.email +
                "'";
              db.query(query, (err, result) => {
                if (err) {
                  res.status(400).send({
                    success: "false",
                    message: "Something is really bad happens",
                    err,
                  });
                } else {
                  res.status(200).send({
                    success: "true",
                    result: result,
                    message:"Password Successfully Changed"
                  });
                }
              });
            }
          });
        } else {
          res.status(200).send({
            success: "true",
            message: "userName Does not exists",
          });
        }
      }
    });
  },
  verifiedCustomer: (req, res) => {
    let query = "SELECT * FROM users WHERE verification_code=" + "'" + req.body.code + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        console.log(result);
        if (result.length >0 ) {
         
          res.status(200).send({
            success: "true",
            message: "User Code Valid",
            data:result[0].email
          });


        } else {
          res.status(200).send({
            success: "true",
            message: "User Code Not Exist",
          });
        }
      }
    });
  },
  verifycustomer: (req, res) => {
    let query = "SELECT * FROM users WHERE email=" + "'" + req.body.email + "'";
    let code=Math.floor(100000 + Math.random() * 900000)
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Email not exist",
          err,
        });
      } else {
        if (result.length > 0) {
          console.log(result[0].id);
          
          let query =
          "UPDATE users SET verification_code = " +
          "'" +
          code +
          "'" +
          " WHERE id=" +
          result[0].id;
          db.query(query, (err, result) => {
            if (err) {
              console.log(err)
              res.status(400).send({
                success: "false",
                message: err,
              });
            } else {

              
  var transport = {
    service: 'gmail',
    auth: {
      user: "juniadahmed12@gmail.com",
      pass: "3242193313",
    },
  };

  var transporter = nodemailer.createTransport(transport);

  res.render(
    "../views/VerifyEmail.ejs",
    {
      email: Buffer.from(req.body.email).toString("base64"),
        num: code,
     
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: "juniadahmed12@gmail.com",
          to: req.body.email,
          // to: "shahacademy333@gmail.com",
          subject: "Verification code",
          html: data,
        };
        // console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.status(404).send({
              success: "false",
              message: "Something really bad happens",
              err,
            });
          } else {
            res.status(200).send({
              success: "true",
              message: "email verification code sent",
              info,
            });
          }
        });
      }
    }
  );


            
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "userName Does not exists",
          });
        }
      }
    });
  },
  
  userLogin: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let query =
      "SELECT * FROM users WHERE email=" +
      "'" +
      email +
      "'";
    db.query(query, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: "false",
          message: err,
        });
      }
      if (user.length > 0) {
        console.log(user.type);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).send({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                firstName: user[0].firstName,
                userID: user[0].userID,
                user_ID: user[0].user_ID,
                avatar: user[0].avatar,
                lastName: user[0].lastName,
                email: user[0].email,
                address: user[0].address,
                phone: user[0].phone,
                lat: user[0].lat,
                lng: user[0].lng,
                password: user[0].password,
                city: user[0].city,
                country: user[0].country,
                type: user[0].type,
              },
              "zibaulkhair",
              {
                expiresIn: "720h",
              }
            );
            return res.status(200).send({
              message: "Auth successful",
              token: token,
              data:user[0]
            });
          } else {
            return res.status(401).send({
              message: "Auth failed",
            });
          }
        });
      } else {
        return res.status(404).send({
          success: "false",
          message: "email is incorrect",
        });
      }
    });
  },
};
