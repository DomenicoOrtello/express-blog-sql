const express = require('express');
const router = express.Router();

// IMPORTO FUNZIONI CONTROLLER
const controller = require("../controllers/postsControllers");

// IMPORTO IL MIDDLEWARE (destrutturando l'oggetto esportato)
const { middlewareErrorString } = require("../middleware/validatorString");

// APPLICO IL MIDDLEWARE SUL PARAMETRO :id
router.use('/:id', middlewareErrorString);

// PARSING DEL BODY (JSON)
router.use(express.json());

// ROTTE

// Index: restituisce tutti i post, eventualmente filtrati per tag
router.get('/', controller.index);

// Show: visualizza un singolo post in base all'id
router.get('/:id', controller.show);

// Store: crea un nuovo post
router.post('/', controller.store);

// Update: aggiorna completamente un post esistente
router.put('/:id', controller.update);

// Modify: aggiorna parzialmente un post esistente
router.patch('/:id', controller.modify);

// Destroy: elimina un post
router.delete('/:id', controller.destroy);

module.exports = router;