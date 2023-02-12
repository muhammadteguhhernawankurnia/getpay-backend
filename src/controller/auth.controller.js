//contoroller untuk logic
//import transaction model
const authModel = require('../model/auth.model');

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        return res.status(200).send({
          message: 'success',
          data: {
            user: result,
            token: 'ssdfsdmkmk',
          },
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'username/password salah' });
      });
  },

  register: (req, res) => {
    return authModel
      .register(req.body)
      .then((result) => {
        return res.status(201).send({ message: 'success', data: result });
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      });
  },
};

module.exports = authController;
