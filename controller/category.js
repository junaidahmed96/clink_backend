module.exports = {
  addCategories: (req, res) => {
    let categoryName = req.body.categoryName;
    let categoryDescription = req.body.categoryDescription;
    let categoryImage = req.body.categoryImage;
    
    if (categoryName) {
      let query =
        "INSERT INTO category(categoryName,categoryDescription,categoryImage) VALUES('" +
        categoryName +
        "','" +
        categoryDescription +
        "','" +
        categoryImage +
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
            message: "Category added succesfully",
            id: result.insertId,
          });
        }
      });
    } else {
      res.status(400).send({
        success: "false",
        message: "categorName is required",
      });
    }
  },
  getCategories: (req, res) => {
    let query =
      "SELECT * FROM `category`";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(200).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  getCategory: (req, res) => {
    let query =
      "SELECT * FROM `category` where categoryID=" + req.params.id;
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
  deleteCategory: (req, res) => {
    let query =
      "DELETE FROM `category` where id=" + req.params.id;
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
  editCategory: (req, res) => {
    let categoryName = req.body.categoryName;
    let categoryDescription = req.body.categoryDescription;
    let categoryImage = req.body.categoryImage;
    let categoryNameArabic = req.body.categoryNameArabic;
    let categoryDescriptionArabic = req.body.categoryDescriptionArabic;
    if (categoryName) {
      let query =
        "UPDATE category SET categoryImage = " +
        "'" +
        categoryImage +
        "'" +
        "," +
        "categoryDescription=" +
        "'" +
        categoryDescription +
        "'" +
        "," +
        "categoryNameArabic=" +
        "'" +
        categoryNameArabic +
        "'" +
        "," +
        "categoryDescriptionArabic=" +
        "'" +
        categoryDescriptionArabic +
        "'" +
        " WHERE categoryID=" +
        "'" +
        req.params.id +
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
          });
        }
      });
    }
    else {
      res.status(400).send({
        success: "false",
        message: "categoryName required",
      });
    }
  }
};
