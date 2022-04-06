const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      // TO DO : be sure to include its associated Products
    })
    res.status(200).json(categories);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      // TO DO: be sure to include its associated Products
    })

    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' })
    }

    res.status(200).json(category);

  } catch(err) {
    res.status(400).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
