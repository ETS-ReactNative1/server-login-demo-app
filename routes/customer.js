const router = require('express').Router();
const removeList = require("../db/dbMongo/queries/list/removeList");
const removeItem = require("../db/dbMongo/queries/list/removeItem");
const getIdsItems = require('../db/dbMongo/queries/list/getIdsItems');
const getIdsCustomers = require("../controllers/authentication/getIdsCustomers");
const getCustomerGroceryList = require("../db/dbMongo/queries/list/getCustomerGroceryList");
const  addGroceryItemToCustomerList = require("../db/dbMongo/queries/list/addGroceryItemToCustomerList");
const { hashPassword } = require("../lib/hashPassword");
const authunticationLogout = require("../controllers/authentication/authunticationLogout");
const verifyAuthentication = require("../controllers/authentication/2.verifyTokenAuthenticator.js");
const { signupCustomer, forgotPassword, resetPassword, } = require("../controllers/authentication/signup");
const CustomerController = require('../controllers/CustomerController/customerController')

//customer routes
router.delete("/remove-list/:customerId", removeList);
router.delete("/remove-item/:idItem/:customerId", removeItem);
router.get("/get-ids-items/:customerId", getIdsItems);
router.get("/get-ids-customers", getIdsCustomers);

router.get("/hash", hashPassword);
router.get("/logout", authunticationLogout);

//router.get("/getCustomerGroceryList/:customerId", verifyAuthentication, getCustomerGroceryList);
router.post("/addTypeaheadDataToCustomerGroceryList/:idItem/:customerId", addGroceryItemToCustomerList.add);
router.post("/signupuser", CustomerController.signUpCustomer);
router.post("/api/forgotpass", forgotPassword);
router.post("/api/resetpass", resetPassword);



module.exports = router;
