const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fallbackImageUrl = 'https://placehold.co/600x400/111827/ffffff?text=No+Image';

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const parsedStock = Number(stock);

    if (!Number.isFinite(parsedStock) || parsedStock < 0) {
      return res.status(400).json({ message: 'Stock must be a non-negative number.' });
    }

    let imageUrl = fallbackImageUrl;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload failed:', uploadError.message);
        imageUrl = fallbackImageUrl;
      }
    }

    const product = new Product({
      name, description, price, category, stock: parsedStock, imageUrl
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      if (stock !== undefined && stock !== null) {
        const parsedStock = Number(stock);
        if (!Number.isFinite(parsedStock) || parsedStock < 0) {
          return res.status(400).json({ message: 'Stock must be a non-negative number.' });
        }
        product.stock = parsedStock;
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;

      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          product.imageUrl = result.secure_url;
        } catch (uploadError) {
          console.error('Cloudinary update upload failed:', uploadError.message);
          product.imageUrl = fallbackImageUrl;
        }
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Update product error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };