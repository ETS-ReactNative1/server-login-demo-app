const { Response } = require('http-status-codez');
const CustomerService = require('../../services/CustomerService');


const {
  ErrorResponse,
  SuccessResponse,
} = require('../../lib/appResponse');

module.exports = {
  signUpCustomer: async (req, res) => {
    try {
      const customer = await new CustomerService().customerSignup(req.body);
      if (customer) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(customer));
      } else {
        throw customer;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

};
