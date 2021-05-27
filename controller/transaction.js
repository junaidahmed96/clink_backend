const { query } = require("express");

module.exports = {
    addTransaction: (req, res) => {
        let userID = req.body.userID;
        let orderDate = new Date();
        let remarks = req.body.remarks;
        let orderAmmount = req.body.orderAmmount;
        let discount = req.body.discount;
        let status = req.body.status;
        let tax = req.body.tax;
        let orderTime = req.body.orderTime;
        let deliveryDate = req.body.deliveryDate;
        let specialInstructions = req.body.specialInstructions;
        if (userID) {
            if (orderAmmount) {
                if (orderDate) {
                    let query =
                        "INSERT INTO transaction(userID,orderDate,orderTime,remarks,orderAmmount,discount,status,tax,deliveryDate,specialInstructions) VALUES('" +
                        userID +
                        "','" +
                        orderDate +
                        "','" +
                        orderTime +
                        "','" +
                        remarks +
                        "','" +
                        orderAmmount +
                        "','" +
                        discount +
                        "','" +
                        status +
                        "','" +
                        tax +
                        "','" +
                        deliveryDate +
                        "','" +
                        specialInstructions +
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
                        message: "pickupTime is required",
                    });
                }
            } else {
                res.status(400).send({
                    success: "false",
                    message: "orderAmmount is required",
                });
            }
        } else {
            res.status(400).send({
                success: "false",
                message: "userID is required",
            });
        }
    },
    getTransactions: (req, res) => {
        let otherResult = [];
        let myResult = [];
        // let query = "select * from user";
        let query1 =
            "SELECT * FROM transaction LEFT JOIN user ON user.userID=transaction.userID";
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
    getTransactionsByUser: (req, res) => {
        let myvar = [];
        let myProducts = [];
        let query1 =
            "SELECT * FROM transaction where userID=" +
            req.params.id;
        db.query(query1, (err, result) => {
            if (err) {
                res.status(400).send({
                    success: "false",
                    message: err,
                    qq: query1,
                });
            } else {
                myvar = result;
            }
        });
        setTimeout(function () {
            for (var i = 0; i < myvar.length; i++) {
                let query =
                    "SELECT * from ref_trans_items LEFT JOIN item ON item.itemID=ref_trans_items.itemID where ref_trans_items.orderID = " + myvar[i].orderID
                db.query(query, (err, result1) => {
                    if (err) {
                        res.status(400).send({
                            success: "false",
                            message: err,
                            result: query1,
                        });
                    } else {
                        myProducts.push(result1);
                    }
                });
            }
        }, 1000);
        setTimeout(() => {
            for (var i = 0; i < myvar.length; i++) {
                myvar[i].products = myProducts[i];
            }
            res.status(200).send({
                success: "false",
                result: myvar,
            });
        }, 2000);
    },
    getTransactionsWithItems: (req, res) => {
        let myvar = [];
        let myProducts = [];
        let query1 =
            "SELECT * FROM transaction where orderID=" + req.params.id;
        db.query(query1, (err, result) => {
            if (err) {
                res.status(400).send({
                    success: "false",
                    message: err,
                    qq: query1,
                });
            } else {
                myvar = result;
            }
        });
        setTimeout(function () {
            for (var i = 0; i < myvar.length; i++) {
                let query =
                    "SELECT * from ref_trans_items LEFT JOIN item ON item.itemID=ref_trans_items.itemID where ref_trans_items.orderID = " + myvar[i].orderID
                db.query(query, (err, result1) => {
                    if (err) {
                        res.status(400).send({
                            success: "false",
                            message: err,
                            result: query1,
                        });
                    } else {
                        myProducts.push(result1);
                    }
                });
            }
        }, 1000);
        setTimeout(() => {
            for (var i = 0; i < myvar.length; i++) {
                myvar[i].products = myProducts[i];
            }
            res.status(200).send({
                success: "false",
                result: myvar,
            });
        }, 2000);
    },


    chnageTransactionStatusCode: (req, res) => {
        let code = req.params.code;
        if (code) {
            // UPDATE Customers
            // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
            // WHERE CustomerID = 1;
            let query =
                "UPDATE transaction SET statusCode = " +
                "'" +
                code +
                "'" +
                " WHERE orderID=" +
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
                        message: "Status udpated succesfully",
                        id: result,
                    });
                }
            });
        } else {
            res.status(400).send({
                success: "false",
                message: "code is required",
            });
        }
    },
};
