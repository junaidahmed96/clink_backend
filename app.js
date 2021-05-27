const express = require("express");
const body_parser = require("body-parser");
const file_upload = require("express-fileupload");
const cookieParser = require("cookie-parser");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
const creds = require("./config/config");
const _ = require("underscore");
const client = require("twilio")(creds.SID, creds.TOKEN);
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
require("./db_conn.js");
app.use(cookieParser());
app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(file_upload());
const checkAuth = require("./controller/checkAuth");

const {
  addUser,
  signUp,
  getUsers,
  getUser,
  userLogin,
  forgotPassword,
  deleteUser,
  checkEmail,
  verifycustomer,
  verifiedCustomer,
  editUser
} = require("./controller/users.js");

const {
  addStore,
  editStore,
  getStores,
  getStore,
  storeLogin,
  getStoreUser,
  changeStoreStatus,
  deleteStore
} = require("./controller/store.js");

const {
  addUnit,
  editUnit,
  getUnit,
  deleteUnit
} = require("./controller/unit.js");

const {
  addUnitProduct,
  editUnitProduct,
  getUnitProduct,
  getUnitProductById,
} = require("./controller/unitproduct.js");

const {
  addItem,
  editItem,
  getItem,
  getItems,
  getFeaturedItems,
  deleteItem
} = require("./controller/item.js");

const {
  addProduct,
  editProduct,
  getProduct,
  getProducts,
  getDistProduct,
  getFeaturedProducts,
  deleteProduct,
  getAreaProducts,
  getStoreProduct
} = require("./controller/product.js");

const {
  addCategories,
  getCategory,
  getCategories,
  editCategory,
  deleteCategory
} = require("./controller/category.js");
const {
  addCoupon,
  getCoupon,
  editCoupon,
  getCoupons,
  deleteCoupon
} = require("./controller/coupon.js");
const {
  addRef_prod_fav,
  getRef_prod_fav,
  editRef_prod_fav,
  deleteRef_prod_fav,
  userRef_prod_fav,
  deleteUserFav
} = require("./controller/ref_prod_fav.js");
const {
  addRef_trans_products,
  getRef_user_prods,
  getOrder_prods,
  editRef_trans_prod,
  getRef_trans_prods,
  getRef_trans_prod,
  deleteRef_trans_prod
} = require("./controller/ref_trans_items.js");
const {
  addTransaction,
  getTransactions,
  chnageTransactionStatusCode,
  getTransactionsByUser,
  getTransactionsWithItems
} = require("./controller/transaction.js");

const {
  addAddress,
  getAddress,
editAddress,
getAddressByCustomer
} = require("./controller/deliveryaddress.js");
// const { addFavourites, editFavourites } = require("./controller/favourites.js");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


//users
app.post("/v1/user", addUser);
app.post("/v1/user/signup", signUp);
app.put("/v1/user/:id", editUser);
app.get("/v1/user",getUsers);
app.get("/v1/user/:id", checkAuth, getUser);
app.delete("/v1/user/:id", checkAuth, deleteUser);
app.post("/v1/login/user", userLogin);
app.post("/v1/forgotPassword/", forgotPassword);
app.post("/v1/checkEmail/:id", checkEmail);
app.post("/v1/verifycode", verifycustomer);
app.post("/v1/verifiedcustomer", verifiedCustomer);

//transactions
app.post("/v1/transaction", checkAuth, addTransaction);
app.get("/v1/transaction", checkAuth, getTransactions);
app.get("/v1/transactionByUserId/:id", checkAuth, getTransactionsByUser);
app.get("/v1/getTransactionsWithItems/:id", checkAuth, getTransactionsWithItems);
app.put("/v1/transaction/:id", checkAuth, chnageTransactionStatusCode);

//items
app.post("/v1/items", checkAuth, addItem);
app.get("/v1/items", getItems);
app.get("/v1/items/:id", getItem);
app.delete("/v1/items/:id", deleteItem);
app.put("/v1/items/:id", checkAuth, editItem);
app.get("/v1/getFeaturedItems/:id", getFeaturedItems);


//addproducts
app.post("/v1/product/add",  addProduct);
app.get("/v1/product/get", getProducts);
app.post("/v1/product/getarea", getAreaProducts);
app.get("/v1/product/get/:id", getProduct);
app.get("/v1/product/getdist", getDistProduct);
app.delete("/v1/product/delete/:id", deleteProduct);
app.put("/v1/product/edit/:id", checkAuth, editProduct);
app.get("/v1/getFeaturedproduct/:id", getFeaturedProducts);
app.get("/v1/getStore/:id", getStoreProduct);



//Cateogories
app.post("/v1/category", addCategories);
app.get("/v1/category", getCategories);
app.get("/v1/category/:id", getCategory);
app.delete("/v1/category/:id", deleteCategory);

app.put("/v1/category/:id", editCategory);

//coupon
app.post("/v1/coupon", checkAuth, addCoupon);
app.get("/v1/coupon", checkAuth, getCoupons);
app.get("/v1/coupon/:id", checkAuth, getCoupon);
app.delete("/v1/coupon/:id", checkAuth, deleteCoupon);
app.put("/v1/coupon/:id", checkAuth, editCoupon);

//favourits
app.post("/v1/fav", checkAuth, addRef_prod_fav);
app.get("/v1/fav", checkAuth, getRef_prod_fav);
app.get("/v1/fav/:id", checkAuth, userRef_prod_fav);
app.delete("/v1/fav/:id", checkAuth, deleteRef_prod_fav);
app.post("/v1/favDelete/", checkAuth, deleteUserFav);

app.put("/v1/fav/:id", checkAuth, editRef_prod_fav);

//ref order items
app.post("/v1/orderItems",  addRef_trans_products);

app.get("/v1/orderItems",  getRef_trans_prods);
app.get("/v1/orderData",  getOrder_prods);
app.get("/v1/storeid/:id",  getRef_user_prods);
app.get("/v1/orderItems/:id", checkAuth, getRef_trans_prod);
app.delete("/v1/orderItems/:id", deleteRef_trans_prod);
app.put("/v1/orderItems/:id", checkAuth, editRef_trans_prod);

//store
app.post("/v1/store", addStore);
app.put("/v1/store/edit", editStore);
app.get("/v1/store/get", getStore);
app.get("/v1/store/getData", getStores);
app.delete("/v1/store/:id", checkAuth, deleteRef_trans_prod);

app.post("/v1/store/login", storeLogin);
app.delete("/v1/store/delete/:id", deleteStore);

//unit
app.post("/v1/unit/add", addUnit);
app.put("/v1/unit/edit", editUnit);
app.get("/v1/unit/get", getUnit);
app.delete("/v1/unit/delete/:id", deleteUnit);

//ref_unit
app.post("/v1/unitproduct/add", addUnitProduct);
app.put("/v1/unitproduct/edit", editUnitProduct);
app.get("/v1/unitproduct/get", getUnitProduct);
app.get("/v1/unitproduct/get/:id", getUnitProductById);

//deliveryaddress
app.post("/v1/deliveryaddress/add", addAddress);
app.put("/v1/deliveryaddress/edit", editAddress);
app.get("/v1/deliveryaddress/get", getAddress);
app.get("/v1/deliveryaddress/getcustomer/:id", getAddressByCustomer);


app.get("/v1/email/verification/:email/:num", async (req, res) => {
  console.log(req.body);

  var transport = {
    host: "smtp.gmail.com",
    auth: {
      user: "anjumzaki8@gmail.com",
      pass: "anjum123",
    },
  };

  var transporter = nodemailer.createTransport(transport);

  ejs.renderFile(
    "./views/VerifyEmail.ejs",
    {
      email: Buffer.from(req.params.email).toString("base64"),
      num: req.params.num,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: "The Zibaul khair",
          to: req.params.email,
          // to: "shahacademy333@gmail.com",
          subject: "The Ziba ul khair Verification",
          html: data,
        };
        // console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.status(404).send({
              success: "false",
              message: "Something really bad happens",
              err,
            });
          } else {
            res.status(200).send({
              success: "true",
              message: "email verification sent",
              info,
            });
          }
        });
      }
    }
  );
});

setInterval(function () {
  db.query("SELECT 1");
  console.log("query");
}, 9000);
module.exports = app;
