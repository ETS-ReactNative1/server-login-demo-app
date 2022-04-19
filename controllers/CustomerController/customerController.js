const { Response } = require('http-status-codez');
const CustomerService = require('../../services/CustomerService');


const {
  ErrorResponse,
  SuccessResponse,
} = require('../../lib/appResponse');

module.exports = {
  signUp: async (req, res) => {
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

  signIn: async (req, res) => {
    try {
      const customer = await new CustomerService().login(req.body);
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

  forgotPassword: async (req, res) => {
    try {
      const response = await new CustomerService().forgotPassword(req.body);
      if (response) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(response));
      } else {
        throw response;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(error));
    }
  },

  resetPassword: async (req, res) => {
    try {
      const response = await new CustomerService().resetPassword(req.body);
      if (response) {
        res
          .status(Response.HTTP_ACCEPTED)
          .json(new SuccessResponse(response));
      } else {
        throw response;
      }
    } catch (error) {
      return res
        .status(error?.code || Response?.HTTP_INTERNAL_SERVER_ERROR)
          .json(new ErrorResponse(error));
    }
  },

};
