module.exports = {
  addProduct: (req, res) => {
    let itemPrice = req.body.itemPrice;
    let itemName = req.body.itemName;
    let description = req.body.description;
    let imgUrl = req.body.imgUrl;
    let categoryID = req.body.categoryID;
    let storeId = req.body.storeId;
    let isFeatured = req.body.isFeatured;
    let itemNameArabic = req.body.itemNameArabic;
    let descriptionArabic = req.body.descriptionArabic;
    let unit_id = req.body.unit_id;
    let createdat = new Date().toISOString().slice(0, 10);
    console.log(req.body);
    console.log(createdat);
    if (itemName) {
      if (description) {
        let query =
          "INSERT INTO product(itemName,description,itemNameArabic,descriptionArabic,imgUrl,category_id,storeId,unit_id,isFeatured,createdAT) VALUES('" +
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
          storeId +
          "','" +
          unit_id +
          "','" +
          isFeatured +
          "','" +
          createdat +
          "')";
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
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

  },
  editProduct: (req, res) => {
    console.log(req.body);
    let itemPrice = req.body.itemPrice;
    let itemName = req.body.itemName;
    let description = req.body.description;
    let imgUrl = req.body.imgUrl;
    let category_id = req.body.categoryID;
    let storeId = req.body.storeId;
    let isFeatured = req.body.isFeatured;

    // UPDATE Customers
    // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    // WHERE CustomerID = 1;
    let query =
      "UPDATE product SET itemPrice = " +
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
      "imgUrl=" +
      "'" +
      imgUrl +
      "'" +
      "," +
      "category_id=" +
      "'" +
      category_id +
      "'" +
      "," +
      "storeId=" +
      "'" +
      storeId +
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
          message: "product edited succesfully",
          id: result,
          // qq: query,
        });
      }
    });

  },
  getProduct: (req, res) => {

    let query = "SELECT product.id ,product.itemName,product.createdat,product.description,product.imgUrl,store.storeName,category.categoryName FROM product LEFT JOIN store on store.id=product.storeId LEFT JOIN category on category.category_id=product.category_id WHERE product.id=" + req.params.id;
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
  getStoreProduct: (req, res) => {

    let query = "SELECT product.itemName,product.id,product.imgUrl,product.createdat,product.description,ref_unitproduct.itemPrice,ref_unitproduct.cvr,category.categoryName FROM product LEFT JOIN ref_unitproduct on ref_unitproduct.ProductId=product.id LEFT JOIN category on category.id=product.category_id WHERE storeId=" + req.params.id;
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

  deleteProduct: (req, res) => {
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

  getProducts: (req, res) => {
    console.log('asda');
    // let query = "SELECT * FROM product LEFT JOIN category on category.categoryID=item.categoryID";
    let query = "SELECT product.id ,product.itemName,product.createdat,product.description,product.imgUrl,product.storeId,category.categoryName,store.storeName,unit.price,unit.unit FROM product LEFT JOIN store on store.id=product.storeId LEFT JOIN unit on unit.id=product.unit_id LEFT JOIN category on category.id=product.category_id";
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

  
  getDistProduct: (req, res) => {
    console.log('asda');
    // let query = "SELECT * FROM product LEFT JOIN category on category.categoryID=item.categoryID";
    let query = "SELECT  category.categoryName,product.id ,product.itemName,product.createdat,product.description,product.imgUrl,product.storeId,store.storeName,unit.price,unit.unit FROM product LEFT JOIN store on store.id=product.storeId LEFT JOIN unit on unit.id=product.unit_id LEFT JOIN category on category.id=product.category_id GROUP BY category.categoryName";
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
  getAreaProducts: (req, res) => {
    console.log('asda');
    let product = []
    // let query = "SELECT * FROM product LEFT JOIN category on category.categoryID=item.categoryID";
    let query = "SELECT product.id ,product.itemName,product.createdat,product.description,product.imgUrl,product.storeId,category.categoryName,store.storeName,store.longitude,store.latitude,store.radius,unit.price,unit.unit FROM product LEFT JOIN store on store.id=product.storeId LEFT JOIN unit on unit.id=product.unit_id LEFT JOIN category on category.id=product.category_id";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        console.log(result);

        if (result) {
          result.map((r1, index) => {
            let lat1 = r1.latitude;
            let lon1 = r1.longitude;
console.log(lat1,lon1);
            let lat2 = req.body.latitude;
            let lon2 = req.body.longitude;

console.log(lat2,lon2);
           

            function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
              var R = 6371; // Radius of the earth in km
              var dLat = deg2rad(lat2 - lat1); // deg2rad below
              var dLon = deg2rad(lon2 - lon1);
              var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
              return d;
            }
            function deg2rad(deg) {
              return deg * (Math.PI / 180);
            }

            let data = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2).toFixed(1);
            console.log('123',r1.radius);
            
            if (r1.radius >= data) {
              console.log('123',data);
         
              product.push(r1)
            }

          })

        }
        if(product.length){
          
          res.status(201).send({
            success: "true",
            result: product,
          });
        }else{
          res.status(400).send({
            success: "false",
            result: [],
          });
        }
      }
    });
  },
  getFeaturedProducts: (req, res) => {
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
