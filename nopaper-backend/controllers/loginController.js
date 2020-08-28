var User = require('../models/userModel');

exports.login = function (req, res, next) {
  console.log(req.body.user + '  ' + req.body.pwd);
  User.find({ user: req.body.user }, function (err, product) {
    if (err) return res.status(501).send('Usuario inválido!');

    if (product[0].pwd === req.body.pwd) {
      var id = product._id; // sitaxe correta?
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300, // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
  });
};
