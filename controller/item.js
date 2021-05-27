module.exports = {
  addItem: (req, res) => {
    let itemPrice = req.body.itemPrice;
    let itemName = req.body.itemName;
    let description = req.body.description;
    let imgUrl = req.body.imgUrl;
    let categoryID = req.body.categoryID;
    let isFeatured = req.body.isFeatured;
    let itemNameArabic = req.body.itemNameArabic;
    let descriptionArabic = req.body.descriptionArabic;
    if (itemPrice) {
      if (itemName) {
        if (description) {
          let query =
            "INSERT INTO item(itemPrice,itemName,description,itemNameArabic,descriptionArabic,imgUrl,categoryID,isFeatured) VALUES('" +
            itemPrice +
            "','" +
            itemName +
            "','" +
            description +
            "','" +
            itemNameArabic +
            "','" +
            descriptionArabic +
            "','" +
            imgUrl +
            "','" +
            categoryID +
            "','" +
            isFeatured +
            "')";
          db.query(query, (err, result) => {
            if (err) {
              res.status(400).send({
                success: "false",
                message: "Something went wrong",
              });
            } else {
              res.status(201).send({
                success: "true",
                message: "Product added succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "description is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "itemName is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "itemPrice is required",
      });
    }
  },
  editItem: (req, res) => {
    let itemPrice = req.body.itemPrice;
    let itemName = req.body.itemName;
    let description = req.body.description;
    let imgUrl = req.body.imgUrl;
    let categoryID = req.body.categoryID;
    let isFeatured = req.body.isFeatured;
    let itemNameArabic = req.body.itemNameArabic;
    let descriptionArabic = req.body.descriptionArabic;
    if (itemPrice) {
      if (itemName) {
        if (description) {
          if (categoryID) {
            // UPDATE Customers
            // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
            // WHERE CustomerID = 1;
            let query =
              "UPDATE item SET itemPrice = " +
              "'" +
              itemPrice +
              "'" +
              "," +
              "itemName=" +
              "'" +
              itemName +
              "'" +
              "," +
              "description=" +
              "'" +
              description +
              "'" +
              "," +
              "itemNameArabic=" +
              "'" +
              itemNameArabic +
              "'" +
              "," +
              "descriptionArabic=" +
              "'" +
              descriptionArabic +
              "'" +
              "," +
              "imgUrl=" +
              "'" +
              imgUrl +
              "'" +
              "," +
              "categoryID=" +
              "'" +
              categoryID +
              "'" +
              "," +
              "isFeatured=" +
              "'" +
              isFeatured +
              "'" +
              " WHERE itemID=" +
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
                  message: "product edited succesfully",
                  id: result,
                  // qq: query,
                });
              }
            });
          } else {
            res.status(400).send({
              success: "false",
              message: "categoryID is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "description is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "itemName is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "itemPrice is required",
      });
    }
  },
  getItem: (req, res) => {

    let query = "SELECT * FROM item WHERE itemID=" + req.params.id;
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
  deleteItem: (req, res) => {
    let query = "DELETE FROM item WHERE itemID=" + req.params.id;
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

  getItems: (req, res) => {
    let query = "SELECT * FROM item LEFT JOIN category on category.categoryID=item.categoryID";
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
  getFeaturedItems: (req, res) => {
    let query = "SELECT * FROM item LEFT JOIN category on category.categoryID=item.categoryID WHERE isFeatured=" + req.params.id;
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
