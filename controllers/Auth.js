const db = require("../model"),
  jwt = require("jsonwebtoken");

class Auth {
  static async signup(req, res, next) {
    try {
      let { ...user } = await db.User.create(req.body);
      delete user._doc.password;

      let token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      return res.status(200).json({
        ...user._doc,
        token,
      });
    } catch (err) {
      // if validation fails
      if (err.code === 11000) {
        err.message = "Sorry username and/or email is taken.";
      }
      return next({
        status: 400,
        message: err.message,
      });
    }
  }

  static async login(req, res, next) {
    try {
      let user = await db.User.findOne({
        email: req.body.email,
      });
      let isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        let { ...restUser } = user;
        let { password, ...rest } = restUser._doc;

        let token = jwt.sign(rest, process.env.JWT_SECRET_KEY, {
          expiresIn: "30d",
        });
        return res.status(200).json({
          ...rest,
          token,
        });
      } else {
        return next({
          status: 400,
          message: "Incorrect Password",
        });
      }
    } catch (err) {
      console.log("err", err);
      return next({
        status: 400,
        message: "Invalid Email/Password",
      });
    }
  }
}

module.exports = { Auth };
