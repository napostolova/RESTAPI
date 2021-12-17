const Post = require('../models/Post');

async function getAll() {
    return  Post.find({});
}

async function create(data) {
    const result = new Post(data);
    await result.save();

    return result;
}

async function getOneById(id) {
    return  Post.findOne({_id: id});
    
}

async function getMyItemsById(id) {
    return  Post.find({ownerId: id});
    
}

async function update(original, updated) {
    Object.assign(original, updated);
    await original.save();

    return original;

}

async function like(postId, userId) {
     await Post.updateOne({_id: postId},  { $addToSet: { likes: userId } }, { new: true })
}

async function remove(id) {
    return  Post.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getMyItemsById,
    getOneById,
    create,
    update,
    like,
    remove

};