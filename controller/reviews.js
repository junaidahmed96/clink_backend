const e = require("express");

module.exports = {
  addReview: (req, res) => {
    let userID = req.body.userID;
    let placeID = req.body.placeID;
    let comment = req.body.comment;
    let star = req.body.star;
    let reviewDate = req.body.reviewDate;

    
    if (userID) {
      if (placeID) {
        let query =
          "INSERT INTO reviews(userID,placeID,comment,reviewDate,star) VALUES('" +
          userID +
          "','" +
          placeID +
          "','" +
          comment +
          "','" +
          reviewDate +
          "','" +
          star +
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
              message: "Comment added succesfully",
              id: result.insertId,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "placeID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "userID  is required",
      });
    }
  },
  editReview: (req, res) => {
    let userID = req.body.userID;
    let placeID = req.body.placeID;
    let comment = req.body.comment;
    let star = req.body.star;
    let reviewDate = req.body.reviewDate;
    
    if (userID) {
      if (placeID) {
        let query =
          "UPDATE reviews SET placeID = " +
          "'" +
          placeID +
          "'" +
          "," +
          "userID=" +
          "'" +
          userID +
          "'" +
          "," +
          "comment=" +
          "'" +
          comment +
          "'" +
          "," +
          "reviewDate=" +
          "'" +
          reviewDate +
          "'" +
          "," +
          "star=" +
          "'" +
          star +
          "'" +
          " WHERE rID=" +
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
              message: "Comment edited succesfully",
              id: result,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "placeID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "userID is required",
      });
    }
  },
  getReviews: (req, res) => {
    let query = "SELECT * FROM reviews";
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
  getReviewByID: (req, res) => {
    let query = "SELECT * FROM reviews WHERE rID=" + req.params.id;
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
  deleteReview: (req, res) => {
    let query = "DELETE FROM reviews WHERE rID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(200).send({
          success: "true",
          message: "reviews deleted succesfully",
          result: result,
        });
      }
    });
  },
  reviewByPlaceID: (req, res) => {
    let query =
      "SELECT * FROM reviews LEFT JOIN user on user.userID = reviews.userID  where reviews.placeID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(200).send({
          success: "true",
          //   message: "reference of product deleted succesfully",
          result: result,
        });
      }
    });
  },
};
