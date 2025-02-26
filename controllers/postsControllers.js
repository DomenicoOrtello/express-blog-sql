// IMPORTO L'ARRAY DEI POST
const postsData = require("../data/allPosts");
const connection = require("../data/db");

// INDEX
function index (req, res) {
    // let postsFiltered = postsData
    // const { tag } = req.query
    // if (tag) {
       // postsFiltered = postsFiltered.filter((post) => 
         //   post.tags.includes(tag)
        //)
    //}
    // res.json(postsFiltered);
    
    const sql = "SELECT * FROM posts";
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });
}

// SHOW
function show (req, res,) {
    const id = req.params.id
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (results.length === 0) return res.status(404).json({ error: 'Pizza not found' });
    res.json(results[0]);
    });
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
    const id = req.params.id
    const sql = 'DELETE FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (results.length === 0) return res.status(404).json({ error: 'Pizza not found' });
    res.json(results[0]);
    });
}

module.exports = { index, store, show, update, modify, destroy };