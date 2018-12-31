module.exports = {


  friendlyName: 'Me',


  description: 'Me auth.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    return this.req.me;

  }


};
