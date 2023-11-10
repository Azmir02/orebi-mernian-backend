async function register(req, res) {
    try {
        res.send("Register successful")
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = register