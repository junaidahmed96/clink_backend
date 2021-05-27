const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

  addUnitProduct: (req, res) => {
    console.log("body",req.body);
    let cvr = req.body.cvr;
    let itemPrice = req.body.itemPrice;
   let ProductId=req.body.ProductId;
   let itemUnit=req.body.itemUnit
   let createdat=new Date()
  
   
    if (ProductId) {
      if (itemPrice) {
        console.log(req.body);
     
            let query =
            "INSERT INTO ref_unitProduct(cvr,itemPrice,ProductId,itemUnit,createdat)VALUES('" +
            cvr +
            "','" +
            itemPrice +
            "','" +
            ProductId +
            "','" +
            itemUnit +
            "','" +
            createdat +
            "')";
            console.log('asdasd',query);
           db.query(query, (err, result) => {
            if (err) {
              res.status(400).send({
                success: "false",
                message: err,
              });
            } else {
                    console.log(result);
                                     return res.status(201).send({
                                        success: "true",
                                        message: "Ref Unit added succesfully",
                                        id: result.insertId,
                                      });
                                    }
                                  });
                                
                           
                 
                          
       
              
    }
}

            
   
        
  },
  editUnitProduct: (req, res) => {
    console.log(req.body);
    let unit = req.body.unit;
    let price = req.body.price;
  
    
                // UPDATE Customers
                // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                // WHERE CustomerID = 1;
                let query =
                  "UPDATE store SET storeName = " +
                  "'" +
                  unit +
                  "'" +
                  "," +
                  "unit=" +
                  "'" +
                  price +
                  "'" +
                  "," +
                  "price=" +
                 
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
               
  },

  getUnitProduct: (req, res) => {
    let query =
      "SELECT * FROM unit ";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          message_error:err
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
  getUnitProductById: (req, res) => {
    let query = "SELECT * FROM ref_unitProduct LEFT JOIN unit on unit.id=ref_unitProduct.itemUnit  WHERE ProductId=" + req.params.id;
    // let query1 =
    //   "SELECT * FROM `Store` LEFT JOIN location on location.locationID=store.locationID WHERE Store.storeId=" +
    //   req.params.id;
 

    db.query(query, (err, result) => {
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
