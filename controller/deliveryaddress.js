// const e = require("express");

module.exports = {
    addAddress: (req, res) => {
      console.log(req.body);
      let addressName = req.body.addressName;
      let business  = req.body.business;
      let customerName = req.body.name;
      let address = req.body.address;
      let city = req.body.city;
      let area = req.body.area;
      let idcard = req.body.idcard;
      let postalcode = req.body.postalcode;
      let number = req.body.number;
      let userID = req.body.userID;
      
        if (addressName) {
          let query =
            "INSERT INTO deliveryaddress(addressName,business,customerName,address,city,area,idcard,postalcode,number,userID) VALUES('" +
           
            addressName +
            "','" +
            business +
            "','" +
            customerName +
            "','" +
            address +
            "','" +
            city +
            "','" +   
              area +
            "','" +   
             idcard +
            "','" +
            number +
            "','" +
            postalcode +
            "','" +
            userID +
            "')";
          db.query(query, (err, result) => {
            if (err) {
              res.status(400).send({
                success: "false",
                message: "Something went wrong",
                id: err,
              });
            } else {
              res.status(201).send({
                success: "true",
                message: "Address Added Succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "Name is required",
          });
        }
      
      
    },
    editAddress: (req, res) => {
      let storeID = req.params.id;
      let day = req.params.day;
      let openTime = req.body.openTime;
      let closeTime = req.body.closeTime;
      let isClosed = req.body.isClosed;
      if (storeID) {
        if (day) {
          // UPDATE Customers
          // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
          // WHERE CustomerID = 1;
          let query =
            "UPDATE storetimings SET storeID= " +
            "'" +
            storeID +
            "'" +
            "," +
            "day=" +
            "'" +
            day +
            "'" +
            "," +
            "openTime=" +
            "'" +
            openTime +
            "'" +
            "," +
            "closeTime=" +
            "'" +
            closeTime +
            "'" +
            "," +
            "isClosed=" +
            "'" +
            isClosed +
            "'" +
            " WHERE storeID=" +
            "'" +
            req.params.id +
            "'" +
            "and day=" +
            "'" +
            req.params.day +
            "'";
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
                message: "store timings edited succesfully",
                id: result,
              });
            }
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "closeTime is required",
        });
      }
    },
    getAddress: (req, res) => {
      let query = "SELECT * FROM deliveryaddress ";
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
    getAddressByCustomer: (req, res) => {
      console.log(req.params.id);
      let query = "SELECT * FROM deliveryaddress  WHERE userID="+req.params.id;
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
  };
  