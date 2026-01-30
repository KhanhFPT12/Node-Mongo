const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// tao route de lay tat ca article
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }  
});

router.get('/:id' , async (req, res) => {
    try {
        const article = await Article.findById(req.params.id); 
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const article = new Article(req.body);
    const result = await article.save();
    res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
    const result = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(result);
}) ; 

 router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router;