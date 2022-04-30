const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

const pw = process.env.MongoPassword;
const uri = "mongodb+srv://Olasubomi:" + pw + "@cluster0-sqg7f.mongodb.net/Product_Supply?retryWrites=true&w=majority";

mongoose.connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports.User = require('./schemas/User');