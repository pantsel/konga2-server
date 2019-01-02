module.exports = {


  friendlyName: 'Init',


  description: 'Init app.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let superAdminRecord = await User.find({
      isSuperAdmin: true,
      active: true
    });

    return {
      hasSuperAdmin: superAdminRecord && superAdminRecord.length ? true : false,
      loggedInUser : this.req.me || {}
    }

  }


};
