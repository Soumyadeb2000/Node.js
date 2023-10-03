const Product = require('../models/product')

exports.postProduct = async (req, res, next) => {
    try {
        const price = req.body.price;
        const product = req.body.product;
        const category = req.body.category;
        const data = await Product.create({price: price, product: product, category: category});
        res.status(201).json({newProduct: data});
    } catch (error) {
        console.log(error);
        res.status(500).json({err: 'Cant add product'});
    }
}

exports.getProduct = (req, res, next) => {
    try {
        Product.findAll()
        .then((products) => {
            if(products.length === 0)
            res.status(404).json('data not found')
            else
            res.status(200).json({products: products});
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({err: 'Cant get product'});
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Product.destroy({where: {id: id}});
    } catch (error) {
        console.log(error);
    }
    
}