const { customer_grocery_list } = require("../../config/db_buildSchema");

module.exports = (req, res) => {
  const { customerId } = req.params;
  let data = {};
  customer_grocery_list.update(
    { list_id: customerId },
    { $set: { grocery_list: [] } },
    function (err, list) {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted entire list");
        console.log(list);
        res.send({
          data: list,
        });
      }
    }
  );
};
