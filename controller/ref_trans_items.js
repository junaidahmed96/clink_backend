const e = require("express");
const stripe = require('stripe')('sk_test_51IemkCJJroWq1MAWyLC4iITa5trWAo7mKYgsrJ40kT0ihWtp9u8szOPV6tSio1WAQhL4utZGvj83Ao6QQXtD9YXv00A3VFMnfc');
module.exports = {
  addRef_trans_products: (req, res) => {
    console.log('req111',req.body);
    
    let stripeToken = req.body?.stripeToken?.id;
    let userID = req.body.userID;
    let customerAddress = req.body.customerAddress+'';
    let itemquantity = req.body.itemquantity+'';
    let product_id = req.body.product_id+'';
    let unitId = req.body.unitId+'';
    let product_amount = req.body.product_amount+'';
    let createdat=new Date().toISOString().slice(0, 10);
  
                 
    let query =
            "INSERT INTO ref_trans_items(product_amount,userID,customerAddress,itemquantity,product_id,unitId,status,createdAt) VALUES('" +
           
            product_amount +
            "','" +
            userID +
            "','" +
            customerAddress +
            "','" +
            itemquantity +
            "','" +
            product_id +
            "','" +
            unitId +
            "','" +
            "1" +
            "','" +
            createdat +
            "')";
   console.log(query);

   try {
    stripe.customers
      .create({
       
        source: stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: req.body.product_amount *100, 
          currency: "usd",
          customer: customer.id
        })
      )
      .then((r1) =>console.log("r1") )
      .catch(err => console.log(err));
   }catch(err){
     console.log(err)
   }

   db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({
        success: "false",
        message: err,
      });
    } else {
      
      res.status(201).send({
        success: "true",
        message: "Order added succesfully",
        id: result.insertId,
      });
    }
  });
          
        }
     ,
  editRef_trans_prod: (req, res) => {
    let orderID = req.body.orderID;
    let itemID = req.body.itemID;
    let itemQuantity = req.body.itemQuantity;
    if (orderID) {
      if (itemID) {
        if (itemQuantity) {
          let query =
            "UPDATE ref_trans_items SET orderID = " +
            "'" +
            orderID +
            "'" +
            "," +
            "itemID=" +
            "'" +
            itemID +
            "'" +
            "," +
            "itemQuantity=" +
            itemQuantity +
            " WHERE rfID=" +
            "'" +
            req.params.id +
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
                message: "reference of product edited succesfully",
                id: result,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "itemQuantity is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "itemID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "orderID is required",
      });
    }
  },
  getRef_trans_prods: (req, res) => {
    let query = "SELECT * FROM ref_trans_items  LEFT JOIN store on store.id=ref_trans_items.userID LEFT JOIN deliveryAddress on deliveryAddress.id=ref_trans_items.customerAddress LEFT JOIN product on product.id=ref_trans_items.product_id WHERE product.id=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
    
        res.status(201).send({
          success: "true",
          message: "Order fetch succesfully",
          id: result,
        });

      }
    })
        
  },
  getOrder_prods: (req, res) => {
    let query = "SELECT ref_trans_items.product_amount, ref_trans_items.itemquantity, deliveryAddress.customerName, deliveryAddress.number, product.itemName  FROM ref_trans_items  LEFT JOIN store on store.id=ref_trans_items.userID LEFT JOIN deliveryAddress on deliveryAddress.id=ref_trans_items.customerAddress LEFT JOIN product on product.id=ref_trans_items.product_id";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
    
        res.status(201).send({
          success: "true",
          message: "Order fetch succesfully",
          id: result,
        });

      }
    })
        
  },
  getRef_user_prods: (req, res) => {
    let query = "SELECT ref_trans_items.id ,ref_trans_items.itemquantity,ref_trans_items.product_amount ,store.storeName ,deliveryAddress.addressName,deliveryAddress.customerName,deliveryAddress.number,deliveryAddress.area,deliveryAddress.city,ref_trans_items.createdat,product.itemName FROM ref_trans_items  LEFT JOIN store on store.id=ref_trans_items.userID LEFT JOIN deliveryAddress on deliveryAddress.id=ref_trans_items.customerAddress LEFT JOIN product on product.id=ref_trans_items.product_id LEFT JOIN unit on unit.id=ref_trans_items.unitid WHERE ref_trans_items.userID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
    
        res.status(201).send({
          success: "true",
          message: "Order fetch succesfully",
          id: result,
        });

      }
    })
        
  },
  getRef_trans_prod: (req, res) => {
    let query = "SELECT * FROM ref_trans_items WHERE orderID=" + req.params.id;
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
  deleteRef_trans_prod: (req, res) => {
    let query = "DELETE  FROM ref_trans_items WHERE id=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "reference of product deleted succesfully",
          result: result,
        });
      }
    });
  },
};
