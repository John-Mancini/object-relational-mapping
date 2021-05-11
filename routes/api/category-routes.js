const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.json(err));

  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.json(err));

  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => res.json(category))
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.findOne({ where: { id: req.params.id } })
    .then(function (category) {
      if (category) {
        category
          .update({
            ...req.body,
          })
          .success(function () {
            //call back
            res.send("Successfully updated Category!");
          });
      }
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then(function (category) {
      if (category) {
        res.send("Successfully deleted Category!");
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;
