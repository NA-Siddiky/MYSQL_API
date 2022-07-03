const db = require('../models')

//create main modal
const Product = db.products
const Review = db.reviews

//main part
// 1. create product
const addProduct = async (req, res) => {
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info);
    res.status(200).send(product);
}

// 2. getAll Products
const getAllProducts = async (req, res) => {
    let products = await Product.findAll({
        // attributes: [
        //     'title',
        //     'price',
        // ]
    });
    res.status(200).send(products);
}

// 3. get Single Products
const getOneProduct = async (req, res) => {
    let id = req.params.id;
    let product = await Product.findOne({
        where: { id: id }
    });
    res.status(200).send(product);
}

// 4. Update Products
const updateProduct = async (req, res) => {
    let id = req.params.id;
    let product = await Product.update(req.body, {
        where: { id: id }
    })
    res.status(200).send(product);
}

// 5. Delete Products
const deleteProduct = async (req, res) => {
    let id = req.params.id;
    let product = await Product.destroy({
        where: { id: id }
    })
    res.status(200).send('product deleted....');
}

// 6. Published Products
const getPublishedProduct = async (req, res) => {
    const products = await Product.findAll({
        where: { published: true }
    })
    res.status(200).send(products);
}

// 7. connect one to many relation product & reviews
const getProductReviews = async (req, res) => {
    const data = await Product.findAll({
        include: [{
            model: Review,
            as: 'review',
        }],
        where: { id: 20 }
    })
    res.status(200).send(data);
}

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews,
}