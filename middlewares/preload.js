const {
    getOneById
} = require('../services/post');


module.exports = (paramName = 'id') => async (req, res, next) => {
    const id = req.params[paramName];

    try {
        const data = await getOneById(id);
        
        if (!data) {
            throw new Error('Not found')
        } 
            req.data = data;
            next();
        

    } catch (error) {
        console.log(error);
         res.status(404).json({ message: 'Not found' });
    }

}