const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  storeLogin: (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let query =
      "SELECT * FROM store WHERE emailAddress=" +
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
        console.log(user);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).send({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
          
                storeName: user[0].storeName,
                emailAddress: user[0].emailAddress,
                street: user[0].street,
                logo: user[0].logo,
                email: user[0].email,
                radius: user[0].radius,
                storeContact: user[0].storeContact,
                longitude: user[0].longitude,
                latitude: user[0].latitude,
                password: user[0].password,
                endAcceptingTime: user[0].endAcceptingTime,
                startAcceptingTime: user[0].startAcceptingTime,
              },
              "zibaulkhair",
              {
                expiresIn: "720h",
              }
            );
            return res.status(200).send({
              message: "Auth successful",
              token: token,
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
  addStore: (req, res) => {
    console.log("body",req.body);
    let storeName = req.body.storeName;
    let emailAddress = req.body.emailAddress;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
  
    let longitude  = req.body.longitude ;
    let latitude  = req.body.latitude ;
    let zipcode  = req.body.zipcode ;
    let street  = req.body.street ;
    let logo  = req.body.logo ;
    // let messageFromStore = req.body.messageFromStore;
    // let orderCancellationPolicy = req.body.orderCancellationPolicy;
    // let aboutStore = req.body.aboutStore;
    // let termsAndConditions = req.body.termsAndConditions;
    // let minPickUpTime = req.body.minPickUpTime;
    let storeContact = req.body.storeContact;
    let radius = req.body.radius;
    let password = req.body.password;
    let endAcceptingTime = req.body.endAcceptingTime;
    let startAcceptingTime = req.body.startAcceptingTime;
    if (storeName) {
      if (emailAddress) {
        console.log(req.body);
        let myQuery = "SELECT * FROM store where emailAddress=" + "'" + emailAddress + "'";
        let myQuery1 = "SELECT * FROM users where email=" + "'" + emailAddress + "'";
        console.log(myQuery);
        db.query(myQuery,myQuery1, (err, result) => {
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
          }else{

          
           bcrypt.hash(password, 10, function (err, hash) { 
            let query =
            "INSERT INTO store(storeName,emailAddress,password,longitude,latitude,street,logo,radius,storeContact,startAcceptingTime,endAcceptingTime,country,state,city,isActive,zipcode) VALUES('" +
            storeName +
            "','" +
            emailAddress +
            "','" +
            hash +
            "','" +
            longitude +
            "','" +
            latitude +
            "','" + 
            street +
            "','" +
            logo+
            "','" +
            radius +
            "','" +
            // messageFromStore +
            // "','" +
            // orderCancellationPolicy +
            // "','" +
            // aboutStore +
            // "','" +
            // termsAndConditions +
            // "','" +
            // minPickUpTime +
            // "','" +
            storeContact +
            "','" +
            startAcceptingTime +
            "','" +
            endAcceptingTime +
            "','" +
            country +
            "','" +
            state +
            "','" +
            city +
            "','" +
            "1" +
            "','" +
            zipcode +
            
            "')";
            
           db.query(query, (err, result) => {
            if (err) {
              res.status(400).send({
                success: "false",
                message: err,
              });
            } else {
              console.log('result',result);
              let email = emailAddress;
              let password1 = hash;
              
              let type="store";
              console.log("result.inserr",result.insertId);
              let user_ID=result.insertId;
          
          
              let creationDate = new Date();
              if (email) {
                db.query( (err, result) => {
                
               
                  
                    if (email) {
                    
                      
                      db.query(myQuery1, (err, result) => {
                        if (err) {
                          console.log(err);
                          return res.status(400).send({
                            success: "false",
                            message: err,
                          });
                        }
                        if (result.length > 0) {
                          res.status(409).send({
                            success: "false",
                            message: "Email already exists",
                          });
                        }
                        else {
                        
                            console.log('hash',hash);
                           
                                  let query =
                                    "INSERT INTO users(email,password,creationDate,type,user_ID) VALUES('" +
                                    email +
                                    "','" +
                                    hash +
                                    "','" +
                                    creationDate +
                                    "','" +
                                    type +
                                    "','" +
                                    user_ID +
                                    "')";
                                  
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
                                        message: "Store added succesfully",
                                        id: result.insertId,
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
              
            
            }
          });

           })
                
              
          

              }
            })
      } else {
        res.status(400).send({
          success: "false",
          message: "emailAddress is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeName Is Required",
      });
    }
  },
  editStore: (req, res) => {
    console.log(req.body);
    let storeName = req.body.storeName;
    let emailAddress = req.body.emailAddress;
    let storeTax = req.body.storeTax;
    let companyID = req.body.companyID;
    let locationId = req.body.locationId;
    let messageFromStore = req.body.messageFromStore;
    let orderCancellationPolicy = req.body.orderCancellationPolicy;
    let aboutStore = req.body.aboutStore;
    let termsAndConditions = req.body.termsAndConditions;
    let minPickUpTime = req.body.minPickUpTime;
    let storeContact = req.body.storeContact;
    let endAcceptingTime = req.body.endAcceptingTime;
    let startAcceptingTime = req.body.startAcceptingTime;
    if (storeName) {
      if (emailAddress) {
        if (storeTax) {
          if (companyID) {
            if (locationId) {
              if (minPickUpTime) {
                // UPDATE Customers
                // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                // WHERE CustomerID = 1;
                let query =
                  "UPDATE store SET storeName = " +
                  "'" +
                  storeName +
                  "'" +
                  "," +
                  "emailAddress=" +
                  "'" +
                  emailAddress +
                  "'" +
                  "," +
                  "storeTax=" +
                  "'" +
                  storeTax +
                  "'" +
                  "," +
                  "companyID=" +
                  "'" +
                  companyID +
                  "'" +
                  "," +
                  "messageFromStore=" +
                  "'" +
                  messageFromStore +
                  "'" +
                  "," +
                  "orderCancellationPolicy=" +
                  "'" +
                  orderCancellationPolicy +
                  "'" +
                  "," +
                  "aboutStore=" +
                  "'" +
                  aboutStore +
                  "'" +
                  "," +
                  "termsAndConditions=" +
                  "'" +
                  termsAndConditions +
                  "'" +
                  "," +
                  "minPickUpTime=" +
                  "'" +
                  minPickUpTime +
                  "'" +
                  "," +
                  "storeContact=" +
                  "'" +
                  storeContact +
                  "'" +
                  "," +
                  "startAcceptingTime=" +
                  "'" +
                  startAcceptingTime +
                  "'" +
                  "," +
                  "endAcceptingTime=" +
                  "'" +
                  endAcceptingTime +
                  "'" +
                  " WHERE storeID=" +
                  req.params.id;
                console.log(query);
                db.query(query, (err, result) => {
                  if (err) {
                    res.status(400).send({
                      success: "false",
                      message: err,
                    });
                  } else {
                    res.status(201).send({
                      success: "true",
                      message: "store edited succesfully",
                      id: result,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "minPickUpTime is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "locationID is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "companyID is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "storeTax is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "emailAddress is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeName is required",
      });
    }
  },

  deleteStore: (req, res) => {
    let query =
      "DELETE FROM `store` where id=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },

  getStores: (req, res) => {
    let query =
      "SELECT * FROM store  ";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
        });
      } else {
        res.status(201).send({
          success: "true",
          //   message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  getStore: (req, res) => {
    let query = "SELECT * FROM user WHERE storeId=" + req.params.id;
    // let query1 =
    //   "SELECT * FROM `Store` LEFT JOIN location on location.locationID=store.locationID WHERE Store.storeId=" +
    //   req.params.id;
     let query1 =
      "SELECT * FROM `Store`";

    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "data fetch succesfully",
          result: result,
        });
      }
    });
  },
  getStoreUser: (req, res) => {
    let query = "SELECT * FROM user WHERE storeId=" + req.params.id;
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
  getStoreStatus: (req, res) => {
    let query =
      "SELECT * FROM Store  LEFT JOIN location ON location.locationID=store.locationID WHERE isActive=" +
      req.params.status;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  changeStoreStatus: (req, res) => {
    let storeID = req.params.id;
    let status = req.params.status;
    if (storeID) {
      if (status) {
        let query =
          "UPDATE store SET isActive = " +
          "'" +
          status +
          "'" +
          " WHERE storeID=" +
          req.params.id;
        console.log(query);
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
            });
          } else {
            res.status(201).send({
              success: "true",
              message: "Status udpated succesfully",
              id: result,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "status is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeID is required",
      });
    }
  },
};
