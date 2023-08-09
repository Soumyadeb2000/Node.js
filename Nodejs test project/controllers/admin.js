const Product = require('../models/product');

exports.addProduct = async (req, res, next) => {
    try {
        const price = req.body.price;
        const product = req.body.product;
        const category = req.body.category;
        const data = await Product.create({price: price, product: product, category: category});
        res.status(201).json({newProductData: data});

    } catch (error) {
        console.log(error)
        res.status(500).json({err: 'Something went wrong!'});
    } 
}

exports.getProduct = async (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.status(200).json({Products: products})
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({error: "Data not found!"})
    })
    
    // try {
    //     const products = await Product.findAll();
    //     res.status(201).json({products: products});
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({err: 'Something went wrong!'});
    // }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const pid = req.params.id;
        await Product.destroy({where: {id: pid}})
        res.status(201).json({res: 'Data successfully deleted'})

    } catch (error) {
        console.log(error)
        res.status(404).json({err: 'Data not found!'});
    }
}