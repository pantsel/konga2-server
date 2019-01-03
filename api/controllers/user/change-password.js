module.exports = {


  friendlyName: 'Change password',


  description: '',


  inputs: {
    password:  {
      required: true,
      type: 'string'
    },
  },


  exits: {
    success: {
      description: 'Password updated successfully.'
    },

    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs) {

    // Users can only update their own passwords
    if(!this.req.me.isSuperAdmin && (this.req.params.id !== this.req.me.id)) {
      throw 'forbidden'
    }

    const updatedUser = await User.update({id: this.req.params.id})
      .set({
        password: await sails.helpers.passwords.hashPassword(inputs.password)
      }).fetch();

    if(!updatedUser) {
      throw 'notFound';
    }

    // All done.
    return updatedUser;

  }


};
