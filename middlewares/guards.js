module.exports = {
    isAuth() {
        return (req, res, next) => {
            if(!req.user) {
                res.status(401).json({ message: 'Please log in.'});
            } else {
                next();
            }
        };
    },


    isOwner() {
        return (req, res, next) => {
            const item = req.data;

            if(req.user._id != item.ownerId) {
                res.status(403).json({ message: 'you cannot modify this post'});
            } else {
                next();
            }

        };
    } 
}