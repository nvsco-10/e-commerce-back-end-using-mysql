const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(categories);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })

    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' })
    }

    res.status(200).json(category);

  } catch(err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    })

    res.status(200).json(category);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = await Category.update(req.body, {
      where: { 
        id: req.params.id 
      }
    })

    if (!newCategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }

    res.status(200).json(newCategory)
  } catch(err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({ 
      where: { 
        id: req.params.id 
      }
    })

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }

    res.status(200).json(deletedCategory)
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
