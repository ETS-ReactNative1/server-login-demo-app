const { Response } = require('http-status-codez');
const CustomerService = require('../../services/UserService');


const {
  ErrorResponse,
  SuccessResponse,
} = require('../../lib/appResponse');

module.exports = {
  signUpCustomer: async (req, res) => {
    try {
      const customer = await new CustomerService().signUpCustomer(req.body);

      if (customer) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(customer));
      } else {
        throw company;
      }
    } catch (error) {
      return res
        .status(error.code || Response.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

};
