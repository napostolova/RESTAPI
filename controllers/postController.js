const router = require('express').Router();

const {    getAll, getMyItemsById, create, update, remove, like } = require('../services/post');
const {isAuth, isOwner } =require('../middlewares/guards');
const { parseError } = require('../utils');
const preload = require('../middlewares/preload');

router.get('/', async (req, res) => {
   console.log(req.user);
    const data = await getAll();
    res.json(data);
})

router.post('/', isAuth(), async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        region: req.body.region,
        ownerId: req.user._id
    }
    try {
        const result = await create(data);

        res.status(201).json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(error.status || 400).json({message});

    }
})

router.get('/:id', preload(), async (req, res) => {
      const item = req.data.toObject();
      
      res.json(item);
})

router.get(`/my-posts/:id`, isAuth(), async(req, res) => {
     const id = req.params.id;
    const data = await getMyItemsById(id)
    res.json(data);

}) 

router.put('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    const updatedData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,  
        region: req.body.region,  
     }
     console.log(updatedData);
    try {
        const result = await update(req.data, updatedData);

        res.status(200).json(result);
    } catch (error) {
        const message = parseError(error);
        console.log(error);
        console.log(message);
        res.status(error.status || 400).json({message});

    }
})

router.post('/:id', isAuth(), preload(), async( req, res) => {
      
    const { id: postId} = req.params;
    const {_id: userId} = req.user;
    try {
      const result = await like(postId, userId);
        res.status(200).json(result);
  
    } catch(error) {
        const message = parseError(error);
        res.status(error.status || 400).json({message});
    }

})

router.delete('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    try {

        await remove(req.params.id);
        res.status(204).end();
    } catch(error) {
        res.status(error.status || 400).json({message: error.message});

    }
})



module.exports = router;