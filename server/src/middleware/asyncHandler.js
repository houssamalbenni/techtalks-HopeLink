module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
/*

    app.get('/user/:id', async (req, res) => {
        const user = await User.findById(req.params.id); 
        res.json(user);
    }); without the asyncHandler is User.findById(re.params.id) throws an error i can not catch it 

 */
