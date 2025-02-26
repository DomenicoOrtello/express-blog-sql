// IMPORTO L'ARRAY DEI POST
const postsData = require("../data/allPosts");
const { Router } = require("express");

// INDEX
function index (req, res) {
    let postsFiltered = postsData
    const { tag } = req.query
    if (tag) {
        postsFiltered = postsFiltered.filter((post) => 
            post.tags.includes(tag)
        )
    }
    res.json(postsFiltered); 
};

// SHOW
function show (req, res,) {
    const post = postsData.find((elm) => elm.id == req.params.id)
    if (!post){
           res.sendStatus(404)
        } 
        res.json(post);
}

// STORE
function store (req, res) {
    const newId = postsData[postsData.length - 1].id + 1;

    const newPizza = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
}

    postsData.push(newPizza);
    res.status(201)
    res.json(newPizza);
}

// UPDATE
function update (req, res) {
    const post = postsData.find((elm) => elm.id == req.params.id)

    if (!post){
        res.status(404)
        res.json("ID inesistente")
    } 
    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags
    res.json(post)
}

// MODIFY
function modify (req, res) {
    const post = postsData.find((elm) => elm.id == req.params.id)

    if (!post){
       res.sendStatus(404)
    } 
    post.title = req.body.title || post.title
    post.content = req.body.content || post.content
    post.image = req.body.image || post.image
    post.tags = req.body.tag || post.tags
    res.json(post)
}

// DESTROY
function destroy (req, res) {
    const post = postsData.find((elm) => elm.id == req.params.id)

    if (!post){
       res.sendStatus(404)
    } 
    postsData.splice(postsData.indexOf(post), 1)
    console.log(postsData)
    res.sendStatus(204)
}

module.exports = { index, store, show, update, modify, destroy }