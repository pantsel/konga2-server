/**
 * ConnectionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Kong = require('../services/Kong');
module.exports = {

  check: async (req, res) => {

    try {
      const resp = await Kong.info(req.body);
      return res.json(resp);
    } catch (e) {
      return res.negotiate(e);
    }

  }

};

