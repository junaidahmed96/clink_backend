const { query } = require("express");

module.exports = {
  addOrder: (req, res) => {
    let saleDate = req.body.saleDate;
    let payDate = req.body.payDate;
    let name = req.body.name;
    let contract = req.body.contract;
    let volume = req.body.volume;
    let downPayment = req.body.downPayment;
    let notes = req.body.notes;
    let comission = req.body.comission;
    let spiff = req.body.spiff;
    let bonus = req.body.bonus;
    let pmd = req.body.pmd;
    let userID = req.body.userID;
    if (saleDate) {
      if (payDate) {
        if (volume) {
          let query =
            "INSERT INTO transaction(saleDate,payDate,name,contract,volume,downPayment,notes,comission,spiff,bonus,userID,pmd) VALUES('" +
            saleDate +
            "','" +
            payDate +
            "','" +
            name +
            "','" +
            contract +
            "','" +
            volume +
            "','" +
            downPayment +
            "','" +
            notes +
            "','" +
            comission +
            "','" +
            spiff +
            "','" +
            bonus +
            "','" +
            userID +
            "','" +
            pmd +
            "')";
          db.query(query, (err, result) => {
            if (err) {
              return res.status(400).send({
                success: "false",
                message: err,
                errasd: result,
              });
            } else {
              return res.status(201).send({
                success: "true",
                message: "transaction added succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "volume is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "payDate is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "saleDate is required",
      });
    }
  },
  editOrder: (req, res) => {
    let saleDate = req.body.saleDate;
    let payDate = req.body.payDate;
    let name = req.body.name;
    let contract = req.body.contract;
    let volume = req.body.volume;
    let downPayment = req.body.downPayment;
    let notes = req.body.notes;
    let comission = req.body.comission;
    let spiff = req.body.spiff;
    let bonus = req.body.bonus;
    let pmd = req.body.pmd;
    if (saleDate) {
      if (payDate) {
        if (name) {
          if (volume) {
            if (downPayment) {
              // UPDATE Customers
              // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
              // WHERE CustomerID = 1;
              let query =
                "UPDATE transaction SET saleDate = " +
                "'" +
                saleDate +
                "'" +
                "," +
                "payDate=" +
                "'" +
                payDate +
                "'" +
                "," +
                "name=" +
                "'" +
                name +
                "'" +
                "," +
                "contract=" +
                "'" +
                contract +
                "'" +
                "," +
                "volume=" +
                "'" +
                volume +
                "'" +
                "," +
                "downPayment=" +
                "'" +
                downPayment +
                "'" +
                "," +
                "notes=" +
                "'" +
                notes +
                "'" +
                "," +
                "comission=" +
                "'" +
                comission +
                "'" +
                "," +
                "spiff=" +
                "'" +
                spiff +
                "'" +
                "," +
                "bonus=" +
                "'" +
                bonus +
                "'" +
                "," +
                "pmd=" +
                "'" +
                pmd +
                "'" +
                " WHERE id=" +
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
                    message: "transaction edited succesfully",
                    id: result,
                  });
                }
              });
            } else {
              res.status(400).send({
                success: "false",
                message: "downPayment is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "volume is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "name is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "payDate is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "saleDate is required",
      });
    }
  },
  getOrder: (req, res) => {
    // let query = "select * from user";
    let query1 =
      "SELECT * FROM transaction";
    myResult = db.query(query1, (err, result) => {
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
  getOrdersByUid: (req, res) => {
    let otherResult = [];
    let myResult = [];
    // let query = "select * from user";
    let query1 =
      "SELECT * FROM transaction where userID = " + req.params.id;
    myResult = db.query(query1, (err, result) => {
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
  getOrdersByUidStatus: (req, res) => {
    let otherResult = [];
    let myResult = [];
    // let query = "select * from user";
    let query1 =
      "SELECT * FROM transaction where userID = " + req.params.id;
    myResult = db.query(query1, (err, result) => {
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
  deleteOrder: (req, res) => {
    let query = "DELETE FROM product WHERE id=" + req.params.id;
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
