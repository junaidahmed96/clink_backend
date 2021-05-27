module.exports = {
    addCoupon: (req, res) => {
        let couponCode = req.body.couponCode;
        let couponDiscount = req.body.couponDiscount;
        let couponMax = req.body.couponMax;
        let couponExpiry = req.body.couponExpiry;
        if (couponCode) {
            let myQuery = "SELECT * FROM coupon where couponCode=" + "'" + couponCode + "'";
            db.query(myQuery, (err, result) => {
                if (err) {
                    return res.status(400).send({
                        success: "false",
                        message: "ASDsda",
                    });
                }
                else if (result.length > 0) {
                    res.status(409).send({
                        success: "false",
                        message: "couponCode already exists",
                    });
                }
                else {
                    if (couponDiscount) {
                        if (couponExpiry) {
                            let query =
                                "INSERT INTO coupon(couponCode,couponDiscount,couponMax,couponExpiry) VALUES('" +
                                couponCode +
                                "','" +
                                couponDiscount +
                                "','" +
                                couponMax +
                                "','" +
                                couponExpiry +
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
                                        message: "Coupon added succesfully",
                                        id: result.insertId,
                                    });
                                }
                            });
                        }
                        else {
                            res.status(400).send({
                                success: "false",
                                message: "couponExpiry is required",
                            });
                        }

                    } else {
                        res.status(400).send({
                            success: "false",
                            message: "couponDiscount is required",
                        });
                    }
                }
            }
            )

        } else {
            res.status(400).send({
                success: "false",
                message: "couponCode is required",
            });
        }
    },
    getCoupon: (req, res) => {
        let query =
            "SELECT * FROM `coupon` where couponID=" + req.params.id;
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
    getCoupons: (req, res) => {
        let query =
            "SELECT * FROM `coupon`"
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
    deleteCoupon: (req, res) => {
        let query =
            "DELETE FROM `coupon` where couponID=" + req.params.id;
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

    editCoupon: (req, res) => {
        let couponCode = req.body.couponCode;
        let couponDiscount = req.body.couponDiscount;
        let couponMax = req.body.couponMax;
        let couponExpiry = req.body.couponExpiry;
        if (couponCode) {
            if (couponExpiry) {
                let query =
                    "UPDATE coupon SET couponCode = " +
                    "'" +
                    couponCode +
                    "'" +
                    "," +
                    "couponDiscount=" +
                    "'" +
                    couponDiscount +
                    "'" +
                    "," +
                    "couponMax=" +
                    "'" +
                    couponMax +
                    "'" +
                    "," +
                    "couponExpiry=" +
                    "'" +
                    couponExpiry +
                    "'" +
                    " WHERE couponID=" +
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
                    message: "couponExpiry required",
                });
            }
        }
        else {
            res.status(400).send({
                success: "false",
                message: "couponCode required",
            });
        }
    }
};
