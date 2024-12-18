// controllers/indexController.js

// Index
function index(req, res) {
    res.render("index", { title: "Dashboard" });
}

module.exports = {
    index,
};
